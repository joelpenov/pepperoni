from rest_framework import serializers
from inventory.models.Product import Product
from inventory.models.UnitOfMeasure import UnitOfMeasure


class ProductSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Codigo')
    description = serializers.CharField(label='Descripcion')
    sell_price=serializers.FloatField(label='Precio de venta')
    unit_quantity=serializers.FloatField(label='Proporción')
    show_in_menu=serializers.BooleanField(label='Mostrar en Menu')
    is_raw_material=serializers.BooleanField(label='Es Materia Prima')
    unit_of_measure = serializers.PrimaryKeyRelatedField(queryset=UnitOfMeasure.objects.all(), label='Unidad de Medida')
    unit_of_measure_description = serializers.SerializerMethodField('get_unit_of_measuredescription')

    def get_unit_of_measuredescription(self, obj):
        return obj.unit_of_measure.description

    class Meta:
        model = Product
        fields = ('id','description','unit_quantity','unit_of_measure','sell_price','show_in_menu', 'is_raw_material','unit_of_measure_description')