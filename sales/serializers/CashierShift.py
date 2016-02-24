from rest_framework import serializers
from sales.models.CashRegister import CashRegister
from sales.models.CashierShift import CashierShift


class CashierShiftSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    cash_register = serializers.PrimaryKeyRelatedField(queryset=CashRegister.objects.all(),label='Caja')
    cash_register_name = serializers.SerializerMethodField('get_cashregistername')
    user_name = serializers.SerializerMethodField('get_username')
    status = serializers.CharField(label='Estado', read_only=True)
    start_date= serializers.DateTimeField(read_only=True,label='Fecha inicio')
    close_date= serializers.DateTimeField(read_only=True,label='Fecha cierre', allow_null=True)
    close_balance = serializers.FloatField(required=False, label='Balance de cierre', default=0)

    def get_cashregistername(self, obj):
        return str(obj.cash_register)

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = CashierShift
        fields = ('id','cash_register','cash_register_name','user_name','status','start_date','close_date', 'close_balance')

    def create(self, validated_data):
        user_id = self.context.get('request').user.id
        oldShift = CashierShift.objects.filter(user_id=user_id,status=CashierShift.ACTIVE).first()
        if(oldShift!=None):
            raise serializers.ValidationError("Solo puede tener un turno activo por almacen")
        shift = CashierShift.objects.create(user_id=user_id,status=CashierShift.ACTIVE, **validated_data)
        shift.save()
        return shift