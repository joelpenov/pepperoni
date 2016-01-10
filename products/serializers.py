from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    cost=serializers.CharField(read_only=True)
    average_cost=serializers.CharField(read_only=True)
    stock=serializers.CharField(read_only=True)
    class Meta:
        model = Product
        fields = ('id','description','cost','sell_price','show_in_menu', 'is_raw_material','cost','average_cost','stock')
