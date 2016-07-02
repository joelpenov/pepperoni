from rest_framework import serializers
from main.validator import CustomValidation
from sales.models.Order import Order, OrderDetail
from sales.models.OrderNumber import OrderNumber
from sales.models.CashierShift import CashierShift
from sales.models.Customer import Customer
from sales.models.SalesArea import SalesArea
from inventory.models.Transaction import Transaction, TransactionDetail


class OrderDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    product_id= serializers.IntegerField(label='Producto')
    product_description = serializers.SerializerMethodField('get_productdescription')
    quantity= serializers.FloatField(label='Cantidad')
    price= serializers.DecimalField(max_digits=20, decimal_places=2, default=0.00, label='Precio')
    total= serializers.DecimalField(max_digits=20, decimal_places=2, default=0.00, label='Total')

    def get_productdescription(self, obj):
        return obj.product.description

    class Meta:
        model = OrderDetail
        fields = ('id','product_id', 'quantity', 'price','product_description', 'total')


class SetOrderDeliverStatusSerializer(serializers.ModelSerializer):
    delivered= serializers.NullBooleanField(required=False, label="Entregado")
    class Meta:
        model = Order
        fields = ('id','delivered')

    def update(self,instance, validated_data):
        delivered = validated_data.pop('delivered')
        instance.delivered = delivered
        instance.save()
        print('delivered')
        print(delivered)
        return instance

    def create(self, validated_data):
        raise serializers.ValidationError("No se puede crear")

    def delete(self, validated_data):
        raise serializers.ValidationError("No se puede borrar")

class OrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')

    created_date= serializers.DateTimeField(read_only=True, label='Fecha de Creación')
    number = serializers.IntegerField(read_only=True, label='Orden')
    clear= serializers.BooleanField(read_only=True)

    to_go= serializers.NullBooleanField(required=False, label="Llevar")
    to_pickup= serializers.NullBooleanField(required=False, label="Recoger")
    delivered= serializers.NullBooleanField(required=False, label="Entregado")

    status = serializers.CharField(read_only=True, label='Estado')
    sales_area=serializers.PrimaryKeyRelatedField(queryset=SalesArea.objects.all(),label='Mesa', required=False, allow_null=True)
    sales_area_name = serializers.SerializerMethodField('get_salesareaname')
    cashier_shift_id = serializers.IntegerField(read_only=True)

    customer_id = serializers.IntegerField(read_only=True)
    customer_name = serializers.CharField(label='Nombre', required=False, allow_blank=True)
    customer_address = serializers.CharField(label='Dirección', required=False, allow_blank=True)
    customer_reference = serializers.CharField(label='Referencia', required=False, allow_blank=True)
    customer_phone = serializers.CharField(label='Teléfono',required=False, allow_blank=True, max_length=12, validators=[CustomValidation.MobileRegexValidator] )
    update_customer_entry= serializers.NullBooleanField(label='Afectar cliente en futuras ordenes', required=False)

    total = serializers.DecimalField(max_digits=20, decimal_places=2, default=0.00, label='Total')
    cash = serializers.DecimalField(max_digits=20, decimal_places=2, default=0.00, label='Efectivo')
    customer_change = serializers.DecimalField(max_digits=20, decimal_places=2, default=0.00, label='Cambio')

    action = serializers.ChoiceField(choices=['save', 'finish', 'cancel'],write_only=True, required=True)

    details = OrderDetailSerializer(many=True, required=True)

    def get_salesareaname(self, obj):
        if obj.sales_area==None:
            return None
        return obj.sales_area.name

    class Meta:
        model = Order
        fields = ('id','created_date','number','clear','to_go','to_pickup','delivered','status','sales_area','sales_area_name','cashier_shift_id','customer_id','customer_name','customer_address',
                  'customer_reference','customer_phone','update_customer_entry','total','cash','customer_change','details','action')

    def getNextOrderNumber(self,shift ):
        orderNumber = OrderNumber.objects.filter(cashier_shift_id=shift.id).first()
        if orderNumber==None:
            orderNumber= OrderNumber.objects.create(cashier_shift_id=shift.id, number=0)
        orderNumber.number = orderNumber.number + 1
        orderNumber.save()
        return orderNumber


    def updateDetails(self, order, details_data):
        for detail in order.details.all():
            detail.delete()

        for detail in details_data:
            OrderDetail.objects.create(order=order, **detail)

        if order.status == Order.FINISHED:
            ware_house = order.cashier_shift.cash_register.warehouse
            note = 'Venta: '+str(order.id)
            inventory_transaction = Transaction.objects.create(warehouse=ware_house,transaction_date= order.created_date,note=note, transaction_type=Transaction.SALES_OUTPUT )
            inventory_transaction.save()

            for detail in details_data:
                TransactionDetail.objects.create(transaction=inventory_transaction, **detail)



    def setCustomer(self, order):
        if(order.customer_phone!=None):
            customer = Customer.objects.filter(phone=order.customer_phone).first()
            if(customer==None):
                customer = Customer.objects.create(phone=order.customer_phone,name=order.customer_name,address=order.customer_address,reference= order.customer_reference)
                customer.save()
            else:
                if(order.update_customer_entry):
                    customer.address=order.customer_address
                    customer.reference=order.customer_reference
                    customer.save()
            order.customer_id = customer.id



    def create(self, validated_data):
        details_data = validated_data.pop('details')

        if(len(details_data)==0):
            raise serializers.ValidationError("Debe agregar por lo menos un producto para generar la factura")

        request = self.context.get('request')
        user_id = request.user.id
        shift = CashierShift.objects.filter(user_id=user_id, status=CashierShift.ACTIVE).first()
        if(shift==None):
            raise serializers.ValidationError("Debe haber un turno de caja activo para poder facturar.")
        orderNumber = self.getNextOrderNumber(shift)

        action = validated_data.pop('action')
        status = Order.ACTIVE
        if action == 'finish':
            status=Order.FINISHED

        if action == 'cancel':
            raise serializers.ValidationError("La orden ha cancelar no existe.")

        order = Order.objects.create(cashier_shift_id=shift.id,number=orderNumber.number, status=status,**validated_data)
        self.setCustomer(order)
        order.save()
        #todo: validate price, and total. for the details and the order.
        self.updateDetails(order,details_data)

        return order


    def update(self,instance, validated_data):
        if instance.status == Order.FINISHED:
             raise serializers.ValidationError("Orden finalizada no puede ser editada.")

        details_data = validated_data.pop('details')

        if(len(details_data)==0):
            raise serializers.ValidationError("Debe agregar por lo menos un producto para generar la factura")

        action = validated_data.pop('action')

        if action == 'finish':
            instance.status =Order.FINISHED

        if action == 'cancel':
            instance.status =Order.VOID

        self.setCustomer(instance)

        order = super(OrderSerializer, self).update(instance, validated_data)

        self.updateDetails(order,details_data)

        return order