from rest_framework import serializers
from .models import Warehouse, InventoryMove, InventoryMoveDetail, Product

class WarehouseSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Código')
    name=serializers.CharField(label='Nombre')

    class Meta:
        model = Warehouse
        fields = ('id','name')

class InventoryMoveDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    product = serializers.IntegerField(label='Producto')
    class Meta:
        model = InventoryMoveDetail
        fields = ('id','product', 'quantity', 'price')


class InventoryMoveSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    warehouse = serializers.PrimaryKeyRelatedField(queryset = Warehouse.objects.all(), label='Almacen')
    transaction_date = serializers.DateField(label='Fecha')
    transaction_type = serializers.CharField(label='Tipo de transacción')
    details = InventoryMoveDetailSerializer(many=True)

    class Meta:
        model = InventoryMove
        fields = ('id','warehouse', 'transaction_date','transaction_type', 'details')

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        move = InventoryMove.objects.create(**validated_data)
        move.transaction_type=InventoryMove.INPUT
        for detail in details_data:
            InventoryMoveDetail.objects.create(InventoryMove=move, **detail)
        return move
