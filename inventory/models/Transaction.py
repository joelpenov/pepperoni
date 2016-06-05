from django.db import models
from inventory.models.Warehouse import Warehouse
from inventory.models.Stock import Stock
from inventory.models.Product import Product


class Transaction(models.Model):
    INPUT = 'INPUT'
    OUTPUT = 'OUTPUT'
    TRANSFER = 'TRANSFER'
    SALES_OUTPUT = 'SALES_OUTPUT'
    MOVE_TYPE_CHOICES = (
        (INPUT, 'Entrada'),
        (OUTPUT, 'Salida'),
        (TRANSFER, 'Transferencia'),
        (SALES_OUTPUT, 'Venta'),
    )

    warehouse = models.ForeignKey(Warehouse, related_name="inventory_moves")
    transfer_to_warehouse = models.ForeignKey(Warehouse, related_name="inventory_transfer_moves", blank=True, null=True)
    transaction_type = models.CharField(max_length=20, choices=MOVE_TYPE_CHOICES, null=False, blank=False)
    transaction_date = models.DateField()
    note = models.CharField(max_length=320, null=True, blank=True)


class TransactionDetail(models.Model):
    transaction = models.ForeignKey(Transaction, related_name="details")
    product = models.ForeignKey(Product, related_name="inventory_move_details")
    quantity = models.FloatField()
    price = models.FloatField()
    total = models.FloatField()

    def updateStock(self):
        transaction = self.transaction
        stock = Stock.objects.filter(product_id=self.product_id).filter(warehouse_id=transaction.warehouse_id).first()
        if (stock == None):
            stock = Stock.objects.create(product_id=self.product_id, warehouse_id=transaction.warehouse_id, quantity=0)

        if (transaction.transaction_type == Transaction.INPUT):
            stock.quantity = stock.quantity + self.quantity

        else:
            stock.quantity = stock.quantity - self.quantity

        if (transaction.transaction_type == Transaction.TRANSFER):
            to_stock = Stock.objects.filter(product_id=self.product_id).filter(
                warehouse_id=transaction.transfer_to_warehouse_id).first()
            if (to_stock == None):
                to_stock = Stock.objects.create(product_id=self.product_id,
                                                warehouse_id=transaction.transfer_to_warehouse_id, quantity=0)
            to_stock.quantity = to_stock.quantity + self.quantity  # sumar al otro
            to_stock.save()

        stock.save()

    def save(self, *args, **kwargs):
        super(TransactionDetail, self).save(*args, **kwargs)
        self.updateStock()
