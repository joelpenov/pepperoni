from rest_framework import serializers
from inventory.models.Product import Product


class ProductSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Codigo')
    description = serializers.CharField(label='Descripcion')
    sell_price=serializers.FloatField(label='Precio de venta')
    show_in_menu=serializers.BooleanField(label='Mostrar en Menu')
    is_raw_material=serializers.BooleanField(label='Es Materia Prima')
    print_on_cashier_shift=serializers.BooleanField(label='Imprimir en Turno')

    class Meta:
        model = Product
        fields = ('id','description','sell_price','show_in_menu', 'is_raw_material','print_on_cashier_shift')