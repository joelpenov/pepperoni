from rest_framework import serializers
from .models import Warehouse, InventoryMove, InventoryMoveDetail, Product, Stock

class WarehouseSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Código')
    name=serializers.CharField(label='Nombre')

    class Meta:
        model = Warehouse
        fields = ('id','name')


class ProductSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Codigo')
    description = serializers.CharField(label='Descripcion')
    sell_price=serializers.FloatField(label='Precio de venta')
    show_in_menu=serializers.BooleanField(label='Mostrar en Menu')
    is_raw_material=serializers.BooleanField(label='Es Materia Prima')

    class Meta:
        model = Product
        fields = ('id','description','sell_price','show_in_menu', 'is_raw_material')


class InventoryMoveDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    product_id= serializers.IntegerField(label='Producto')
    product_description = serializers.SerializerMethodField('get_productdescription')

    def get_productdescription(self, obj):
        return obj.product.description

    class Meta:
        model = InventoryMoveDetail
        fields = ('id','product_id', 'quantity', 'price','product_description', 'total')


class InventoryMoveSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    warehouse = serializers.PrimaryKeyRelatedField(queryset = Warehouse.objects.all(), label='Almacen')
    transaction_date = serializers.DateField(label='Fecha')
    transaction_type = serializers.CharField(label='Tipo de transacción', read_only=True)
    note = serializers.CharField(label='Nota', required=False, allow_blank=True)
    details = InventoryMoveDetailSerializer(many=True)

    warehouse_description = serializers.SerializerMethodField('get_warehousedescription')

    def get_warehousedescription(self, obj):
        return obj.warehouse.name


    class Meta:
        model = InventoryMove
        fields = ('id','warehouse', 'transaction_date','warehouse_description','transaction_type', 'details', 'note')

    def saveDetails(self, move, details_data):
        for detail in details_data:
            InventoryMoveDetail.objects.create(inventory_move=move, **detail)

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        move = InventoryMove.objects.create(**validated_data)
        move.transaction_type=self.context.get('transaction_type')
        move.save()
        self.saveDetails(move, details_data)

        return move


class WerehouseStockSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    warehouse_id = serializers.IntegerField(label='Codigo almacen')
    product_id = serializers.IntegerField(label='Producto')

    warehouse_description = serializers.SerializerMethodField('get_warehousedescription')
    product_description = serializers.SerializerMethodField('get_productdescription')
    quantity = serializers.FloatField(label='Cantidad')    

    def get_warehousedescription(self, obj):
        return obj.warehouse.name

    def get_productdescription(self, obj):
        return obj.product.description

    class Meta:
        model = Stock
        fields = ('id', 'warehouse_id','product_id','warehouse_description','product_description', 'quantity')
