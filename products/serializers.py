from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','description','cost','sell_price','show_in_menu', 'is_raw_material')
