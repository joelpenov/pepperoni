from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Codigo')
    description = serializers.CharField(label='Descripcion')
    sell_price=serializers.FloatField(label='Precio de venta')
    show_in_menu=serializers.BooleanField(label='Mostrar en Menu')
    is_raw_material=serializers.BooleanField(label='Es Materia Prima')
    cost=serializers.FloatField(read_only=True, label='Costo')
    average_cost=serializers.FloatField(read_only=True, label='Costo Promedio')
    stock=serializers.FloatField(read_only=True, label='Existencia')

    class Meta:
        model = Product
        fields = ('id','description','sell_price','show_in_menu', 'is_raw_material','cost','average_cost','stock')
