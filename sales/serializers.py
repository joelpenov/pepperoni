from inventory.models import Warehouse
from rest_framework import serializers
from .models import CashRegister, Customer, CashierShift, Order, OrderNumber, SalesArea


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
    phone = serializers.CharField(label='Teléfono')
    name = serializers.CharField(label='Nombre')
    address = serializers.CharField(label='Dirección', required=False, allow_blank=True)
    reference = serializers.CharField(label='Referencia', required=False, allow_blank=True)

    class Meta:
        model = Customer
        fields = ('id','phone','name','address','reference')


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')

    created_date= serializers.DateTimeField(read_only=True, label='Fecha de Creación')
    number = serializers.IntegerField(read_only=True, label='Orden')
    clear= serializers.BooleanField(read_only=True)
    status = serializers.CharField(read_only=True, label='Estado')
    sales_area=serializers.PrimaryKeyRelatedField(queryset=SalesArea.objects.all(),label='Mesa', required=False, allow_null=True)
    sales_area_name = serializers.SerializerMethodField('get_salesareaname')
    cashier_shift_id = serializers.IntegerField(read_only=True)

    customer_id = serializers.IntegerField(read_only=True)
    customer_name = serializers.CharField(label='Nombre', required=False, allow_blank=True)
    customer_address = serializers.CharField(label='Dirección', required=False, allow_blank=True)
    customer_reference = serializers.CharField(label='Referencia', required=False, allow_blank=True)
    customer_phone = serializers.CharField(label='Teléfono', required=False, allow_blank=True)
    update_customer_entry= serializers.BooleanField(label='Afectar cliente en futuras ordenes')

    total = serializers.FloatField(label='Total')
    cash = serializers.FloatField(label='Efectivo')
    customer_change = serializers.FloatField(label='Cambio')

    def get_salesareaname(self, obj):
        if obj.sales_area==None:
            return None
        return obj.sales_area.name

    class Meta:
        model = Order
        fields = ('id','date','number','clear','status','sales_area','sales_area_name','cashier_shift_id','customer_id','customer_name','customer_address',
                  'customer_reference','customer_phone','update_customer_entry','total','cash','customer_change')

    def create(self, validated_data):
        user_id = self.context.get('request').user.id
        shift = CashierShift.objects.filter(user_id=user_id, status=CashierShift.ACTIVE).first()

        # today = date.today()
        # date__year=today.year, date__month=today.month, date__day=today.day
        orderNumber = OrderNumber.objects.filter(cashier_shift_id=shift.id).first()
        if orderNumber==None:
            orderNumber= OrderNumber.objects.create(cashier_shift_id=shift.id, number=0)
        orderNumber.number = orderNumber.number + 1
        orderNumber.save()

        order = Order.objects.create(cashier_shift_id=shift.id,number=orderNumber.number, status=Order.ACTIVE,**validated_data)

        return order