from rest_framework import serializers
from .models import CashRegister, Customer


class CashRegisterSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    name = serializers.CharField(label='Nombre')

    class Meta:
        model = CashRegister
        fields = ('id','name')


class CustomerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    phone = serializers.CharField(label='Teléfono')
    name = serializers.CharField(label='Nombre')
    address = serializers.CharField(label='Dirección', required=False, allow_blank=True)
    reference = serializers.CharField(label='Referencia', required=False, allow_blank=True)

    class Meta:
        model = Customer
        fields = ('id','phone','name','address','reference')
