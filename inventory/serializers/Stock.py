from rest_framework import serializers
from inventory.models.Stock import Stock


class StockSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    warehouse_id = serializers.IntegerField(label='Codigo almacen')
    product_id = serializers.IntegerField(label='Producto')

    warehouse_description = serializers.SerializerMethodField('get_warehousedescription')
    product_description = serializers.SerializerMethodField('get_productdescription')
    quantity = serializers.FloatField(label='Cantidad')
    cost = serializers.DecimalField(max_digits=20, decimal_places=2, default=0.00, label='cost')

    def get_warehousedescription(self, obj):
        return obj.warehouse.name

    def get_productdescription(self, obj):
        return obj.product.description

    class Meta:
        model = Stock
        fields = ('id', 'warehouse_id','product_id','warehouse_description','product_description', 'quantity', 'cost')