from rest_framework import serializers
from inventory.models.ProductUsage import ProductUsage, ProductUsageDetail
from inventory.models.Transaction import Transaction, TransactionDetail
from inventory.models.Warehouse import Warehouse
from inventory.models.Stock import Stock


class ProductUsageDetailSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True, label='Codigo')
    included_in_output = serializers.BooleanField(label='Incluir')
    unit_quantity = serializers.IntegerField(read_only=True)
    unit_of_measure_id = serializers.IntegerField(read_only=True)
    unit_of_measure_description = serializers.SerializerMethodField('get_unit_of_measuredescription')
    product_id = serializers.IntegerField(read_only=True, label='Producto')
    product_description = serializers.SerializerMethodField('get_productdescription')
    old_stock = serializers.FloatField(read_only=True, label='Ultima Existencia')
    new_stock = serializers.FloatField(label='Existencia actual')
    stock_usage = serializers.FloatField(label='Usada')


    def get_productdescription(self, obj):
        return obj.product.description

    def get_unit_of_measuredescription(self, obj):
        return obj.unit_of_measure.description

    class Meta:
        model = ProductUsageDetail
        fields = ('id','included_in_output','unit_quantity', 'unit_of_measure_id','unit_of_measure_description',
                  'product_id', 'product_description','old_stock', 'new_stock','stock_usage')


class ProductUsageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, label='Codigo')
    warehouse = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all(), label='Almacen')
    warehouse_description = serializers.SerializerMethodField('get_warehousedescription')
    created_date = serializers.DateTimeField(read_only=True, label='Fecha de Creación')
    status = serializers.CharField(read_only=True, label='Estado')
    details = ProductUsageDetailSerializer(many=True, required=False)

    def get_warehousedescription(self, obj):
        return obj.warehouse.name

    class Meta:
        model = ProductUsage
        fields = ('id', 'warehouse','created_date','status', 'warehouse_description','details')

    def createDetails(self, product_usage):
        details = Stock.objects.filter(product__is_raw_material=True, warehouse_id= product_usage.warehouse_id)
        for detail in details:
            ProductUsageDetail.objects.create(product_usage=product_usage,
                                              included_in_output=True,
                                              unit_quantity=detail.product.unit_quantity,
                                              unit_of_measure=detail.product.unit_of_measure,
                                              product=detail.product,
                                              old_stock=detail.quantity,
                                              new_stock =0,
                                              stock_usage =0)


    def updateDetails(self, product_usage, details_data):
        #todo: instead merge the new one or delete it
        for detail in product_usage.details.all():
            detail.delete()

        for detail in details_data:
            ProductUsageDetail.objects.create(product_usage=product_usage, **detail)

        if product_usage.status == ProductUsage.FINISHED:
            ware_house = product_usage.warehouse
            note = 'Productos Terminados: '+str(product_usage.id)
            inventory_transaction = Transaction.objects.create(warehouse=ware_house,transaction_date= product_usage.created_date,
                                                               note=note, transaction_type=Transaction.SALES_OUTPUT )
            inventory_transaction.save()

            for detail in product_usage.details:
                TransactionDetail.objects.create(transaction=inventory_transaction, product=detail.product,
                                                 quantity=detail.stock_usage, price=detail.product.sell_price)



    def create(self, validated_data):
        request = self.context.get('request')
        user_id = request.user.id
        product_usage = ProductUsage.objects.create(user_id=user_id,status=ProductUsage.ACTIVE, **validated_data)
        product_usage.save()
        self.createDetails(product_usage)
        return product_usage


    def update(self, product_usage, validated_data):
        details_data = validated_data.pop('details')

        if (len(details_data) == 0):
            raise serializers.ValidationError("Debe agregar por lo menos una entrada para processar los productos terminados.")

        product_usage.status = ProductUsage.FINISHED
        self.updateDetails(product_usage, details_data)
