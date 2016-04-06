from rest_framework import serializers
from inventory.models.Warehouse import Warehouse
from inventory.models.Transaction import Transaction, TransactionDetail




class TransactionDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    product_id= serializers.IntegerField(label='Producto')
    product_description = serializers.SerializerMethodField('get_productdescription')

    def get_productdescription(self, obj):
        return obj.product.description

    class Meta:
        model = TransactionDetail
        fields = ('id','product_id', 'quantity', 'price','product_description', 'total')


class TransactionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    warehouse = serializers.PrimaryKeyRelatedField(queryset = Warehouse.objects.all(), label='Almacen')
    transaction_date = serializers.DateField(label='Fecha')
    transaction_type = serializers.CharField(label='Tipo de transacción', read_only=True)
    note = serializers.CharField(label='Nota', required=False, allow_blank=True)
    details = TransactionDetailSerializer(many=True)

    warehouse_description = serializers.SerializerMethodField('get_warehousedescription')

    def get_warehousedescription(self, obj):
        return obj.warehouse.name


    class Meta:
        model = Transaction
        fields = ('id','warehouse', 'transaction_date','warehouse_description','transaction_type', 'details', 'note')

    def saveDetails(self, transaction, details_data):
        for detail in details_data:
            TransactionDetail.objects.create(transaction=transaction, **detail)

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        transaction = Transaction.objects.create(**validated_data)
        transaction.transaction_type=self.context.get('transaction_type')
        transaction.save()
        self.saveDetails(transaction, details_data)

        return transaction


class TransactionTransferSerializer(TransactionSerializer):

     warehouse = serializers.PrimaryKeyRelatedField(queryset = Warehouse.objects.all(), label='Desde Almacen')
     transfer_to_warehouse = serializers.PrimaryKeyRelatedField(queryset = Warehouse.objects.all(), label='Transferir a')
     warehouse_transfer_description = serializers.SerializerMethodField('get_warehousetransferdescription')

     def get_warehousetransferdescription(self, obj):
        return obj.transfer_to_warehouse.name

     class Meta:
        model = Transaction
        fields = ('id','warehouse','transfer_to_warehouse', 'transaction_date','warehouse_description','warehouse_transfer_description','transaction_type', 'details', 'note')
