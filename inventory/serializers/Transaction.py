from rest_framework import serializers
from inventory.models.Warehouse import Warehouse
from inventory.models.Transaction import Transaction, TransactionDetail
from inventory.models.Product import Product




class TransactionDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Código')
    product_id= serializers.IntegerField(label='Producto')
    unit_quantity= serializers.FloatField(read_only=True)
    product_description = serializers.SerializerMethodField('get_productdescription')
    unit_of_measure_description = serializers.SerializerMethodField('get_unit_of_measuredescription')

    def get_productdescription(self, obj):
        return obj.product.description

    def get_unit_of_measuredescription(self, obj):
        return obj.unit_of_measure.abbreviation

    class Meta:
        model = TransactionDetail
        fields = ('id','product_id','unit_quantity','unit_of_measure_description', 'quantity', 'price','product_description', 'total')


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
            product_id = detail.pop('product_id')
            product = Product.objects.get(pk=product_id)
            unit_quantity = product.unit_quantity
            unit_of_measure_id = product.unit_of_measure.id
            TransactionDetail.objects.create(transaction=transaction, product_id= product_id,unit_quantity=unit_quantity,unit_of_measure_id=unit_of_measure_id, **detail)

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
