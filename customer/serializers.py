from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    address = serializers.CharField(read_only=True, label='Dirección')
    reference = serializers.CharField(read_only=True, label='Referencia')
    phone = serializers.CharField(read_only=True, label='Teléfono')
    
    class Meta:
        model = Customer
        fields = ('id','name','address','reference','phone')
