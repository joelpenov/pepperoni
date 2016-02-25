from rest_framework import serializers


class CustomValidation():
    MobileRegexValidator = serializers.RegexValidator(regex=r'^\d{3}-\d{3}-\d{4}$', message='Favor utilizar el siguiente format para el telefono: 908-555-0000')


