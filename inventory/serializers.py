from rest_framework import serializers
from .models import Warehouse, InventoryMove, InventoryMoveDetail

class WarehouseSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Código')
    name=serializers.CharField(label='Nombre')

    class Meta:
        model = Warehouse
        fields = ('id','name')

class InventoryMoveSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    Warehouse = serializers.PrimaryKeyRelatedField(queryset = Warehouse.objects.all())
    transaction_type = serializers.IntegerField(label='Tipo de transacción')

    class Meta:
        model = InventoryMove
        fields = ('id','Warehouse', 'transaction_type')
