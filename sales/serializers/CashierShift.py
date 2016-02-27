from rest_framework import serializers
from datetime import datetime
from sales.models.CashRegister import CashRegister
from sales.models.CashierShift import CashierShift


class CashierShiftSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    cash_register = serializers.PrimaryKeyRelatedField(queryset=CashRegister.objects.all(),label='Caja')
    cash_register_name = serializers.SerializerMethodField('get_cashregistername')
    user_name = serializers.SerializerMethodField('get_username')
    status = serializers.CharField(label='Estado', read_only=True)
    start_date= serializers.DateTimeField(read_only=True,label='Fecha inicio')
    start_balance = serializers.FloatField(required=True, label='Balance de inicial')
    close_date= serializers.DateTimeField(read_only=True,label='Fecha cierre', allow_null=True)
    close_balance = serializers.FloatField(required=False, label='Balance de cierre', default=0)

    def get_cashregistername(self, obj):
        return str(obj.cash_register)

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = CashierShift
        fields = ('id','cash_register','cash_register_name','user_name','start_balance','status','start_date','close_date', 'close_balance')


    def create(self, validated_data):
        user_id = self.context.get('request').user.id
        oldShift = CashierShift.objects.filter(user_id=user_id,status=CashierShift.ACTIVE).first()
        if(oldShift!=None):
            raise serializers.ValidationError("Solo puede tener un turno activo por almacen")
        shift = CashierShift.objects.create(user_id=user_id,status=CashierShift.ACTIVE, **validated_data)
        shift.status = CashierShift.ACTIVE
        shift.save()
        return shift


    def update(self,instance, validated_data):
        if(instance.status == CashierShift.CLOSE):
            raise serializers.ValidationError("El turno de caja ya esta cerrado.")

        close_balance = validated_data.pop('close_balance')
        instance.close_balance = close_balance
        instance.end_date= datetime.now()
        instance.status = CashierShift.CLOSE
        instance.save()
        return instance