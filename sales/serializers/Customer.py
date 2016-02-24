from rest_framework import serializers
from sales.models.Customer import Customer
from main.validator import CustomValidation
from rest_framework.validators import UniqueValidator


class CustomerSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True, label='Código')
    phone = serializers.CharField(label='Teléfono', max_length=12, validators=[CustomValidation.MobileRegexValidator, UniqueValidator(Customer.objects.all())] )
    name = serializers.CharField(label='Nombre')
    address = serializers.CharField(label='Dirección', required=False, allow_blank=True)
    reference = serializers.CharField(label='Referencia', required=False, allow_blank=True)


    class Meta:
        model = Customer
        fields = ('id','phone','name','address','reference')