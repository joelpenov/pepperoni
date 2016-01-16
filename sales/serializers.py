from rest_framework import serializers
from .models import CashRegister


class CashRegisterSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    name = serializers.CharField(label='Nombre')

    class Meta:
        model = CashRegister
        fields = ('id','name')