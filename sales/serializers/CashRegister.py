from rest_framework import serializers
from sales.models.CashRegister import CashRegister
from inventory.models.Warehouse import Warehouse


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