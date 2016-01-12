from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Codigo')
    cost=serializers.FloatField(read_only=True, label='Costo')
    average_cost=serializers.FloatField(read_only=True, label='Costo Promedio')
    stock=serializers.FloatField(read_only=True, label='Existencia')
    class Meta:
        model = Product
        fields = ('id','description','cost','sell_price','show_in_menu', 'is_raw_material','cost','average_cost','stock')
