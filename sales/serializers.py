from inventory.models import Warehouse, Product
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import CashRegister, Customer, CashierShift, Order, OrderDetail, OrderNumber, SalesArea


class CustomValidation():
    MobileRegexValidator = serializers.RegexValidator(regex=r'^\d{3}-\d{3}-\d{4}$', message='Favor utilizar el siguiente format para el telefono: 908-555-0000')


class SalesAreaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    name = serializers.CharField(label='Nombre')

    class Meta:
        model = SalesArea
        fields = ('id','name')

class CashRegisterSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    name = serializers.CharField(label='Nombre')
    warehouse = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all(),label='Almacen')
    warehouse_name = serializers.SerializerMethodField('get_warehousename')

    def get_warehousename(self, obj):
        return obj.warehouse.name

    class Meta:
        model = CashRegister
        fields = ('id','name','warehouse', 'warehouse_name')


class CashierShiftSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    cash_register = serializers.PrimaryKeyRelatedField(queryset=CashRegister.objects.all(),label='Caja')
    cash_register_name = serializers.SerializerMethodField('get_cashregistername')
    user_name = serializers.SerializerMethodField('get_username')
    status = serializers.CharField(label='Estado', read_only=True)
    start_date= serializers.DateTimeField(read_only=True,label='Fecha inicio')
    close_date= serializers.DateTimeField(read_only=True,label='Fecha cierre', allow_null=True)
    close_balance = serializers.FloatField(required=False, label='Balance de cierre', default=0)

    def get_cashregistername(self, obj):
        return str(obj.cash_register)

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = CashierShift
        fields = ('id','cash_register','cash_register_name','user_name','status','start_date','close_date', 'close_balance')

    def create(self, validated_data):
        user_id = self.context.get('request').user.id
        shift = CashierShift.objects.create(user_id=user_id,status=CashierShift.ACTIVE, **validated_data)
        shift.save()
        return shift


class CustomerSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True, label='Código')
    phone = serializers.CharField(label='Teléfono', max_length=12, validators=[CustomValidation.MobileRegexValidator, UniqueValidator(Customer.objects.all())] )
    name = serializers.CharField(label='Nombre')
    address = serializers.CharField(label='Dirección', required=False, allow_blank=True)
    reference = serializers.CharField(label='Referencia', required=False, allow_blank=True)


    class Meta:
        model = Customer
        fields = ('id','phone','name','address','reference')


class OrderDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    product_id= serializers.IntegerField(label='Producto')
    product_description = serializers.SerializerMethodField('get_productdescription')
    quantity= serializers.FloatField(label='Cantidad')
    price= serializers.FloatField(label='Precio')
    total= serializers.FloatField(label='Total')

    def get_productdescription(self, obj):
        return obj.product.description

    class Meta:
        model = OrderDetail
        fields = ('id','product_id', 'quantity', 'price','product_description', 'total')


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

    total = serializers.FloatField(label='Total')
    cash = serializers.FloatField(label='Efectivo')
    customer_change = serializers.FloatField(label='Cambio')

    action = serializers.ChoiceField(choices=['save', 'finish'],write_only=True, required=True)

    details = OrderDetailSerializer(many=True)

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

        action = validated_data.pop('action')

        if action == 'finish':
            instance.status =Order.FINISHED

        self.setCustomer(instance)

        order = super(OrderSerializer, self).update(instance, validated_data)

        self.updateDetails(order,details_data)

        return order