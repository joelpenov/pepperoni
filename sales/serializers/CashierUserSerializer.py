from rest_framework import serializers
from main.validator import CustomValidation
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class CashierUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True, label='Usuario')
    first_name = serializers.CharField(read_only=True, label='Nombre')
    last_name = serializers.CharField(read_only=True, label='Apellidos')
    is_superuser = serializers.BooleanField(read_only=True, label='Administrador')
    is_active = serializers.BooleanField(read_only=True, label='Activo')
    date_joined = serializers.DateTimeField(read_only=True, label='Creado')
    last_login = serializers.DateTimeField(read_only=True, label='Ultimo login')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'is_active', 'date_joined', 'last_login', 'is_superuser')