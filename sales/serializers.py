from rest_framework import serializers
from inventory.models import Warehouse
from .models import CashRegister, Customer, CashierShift


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
    start_date= serializers.DateTimeField(read_only=True,label='Fecha inicio')
    close_date= serializers.DateTimeField(read_only=True,label='Fecha cierre', allow_null=True)
    close_balance = serializers.FloatField(required=False, label='Balance de cierre', default=0)

    def get_cashregistername(self, obj):
        return obj.cash_register.name+ ' '+obj.cash_register.warehouse.name

    class Meta:
        model = CashierShift
        fields = ('id','cash_register','cash_register_name','start_date','close_date', 'close_balance')

    def create(self, validated_data):
        user_id = self.context.get('request').user.id
        shift = CashierShift.objects.create(user_id=user_id, **validated_data)
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
