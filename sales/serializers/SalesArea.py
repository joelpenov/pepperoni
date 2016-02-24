from rest_framework import serializers
from sales.models.SalesArea import SalesArea

class SalesAreaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    name = serializers.CharField(label='Nombre')

    class Meta:
        model = SalesArea
        fields = ('id','name')