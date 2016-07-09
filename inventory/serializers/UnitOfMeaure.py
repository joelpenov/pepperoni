from rest_framework import serializers
from inventory.models.UnitOfMeasure import UnitOfMeasure


class UnitOfMeasureSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Código')
    description=serializers.CharField(label='Descripción')
    abbreviation=serializers.CharField(label='Abreviación')

    class Meta:
        model = UnitOfMeasure
        fields = ('id','description','abbreviation' )
