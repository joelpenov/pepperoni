from django.db import models
import decimal
from inventory.models.Warehouse import Warehouse
from inventory.models.Stock import Stock
from inventory.models.Product import Product
from inventory.models.UnitOfMeasure import UnitOfMeasure


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
    unit_quantity = models.FloatField(default=1)
    unit_of_measure = models.ForeignKey(UnitOfMeasure, related_name="product_transaction_units", blank=True, null=True)
    quantity = models.FloatField()
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)

    def updateAvgCost(self, stock, new_quantity):
        old_quantity = stock.quantity
        stock.quantity = old_quantity + new_quantity

        old_stock_cost = decimal.Decimal(stock.cost) * decimal.Decimal(old_quantity)
        new_stock_cost = decimal.Decimal(self.price) * decimal.Decimal(new_quantity)
        stock.cost = (old_stock_cost + new_stock_cost) / decimal.Decimal(stock.quantity)



    def updateStock(self):
        transaction = self.transaction
        stock = Stock.objects.filter(product_id=self.product_id).filter(warehouse_id=transaction.warehouse_id).first()
        if (stock == None):
            stock = Stock.objects.create(product_id=self.product_id, warehouse_id=transaction.warehouse_id, quantity=0)


        stock_quantity = self.unit_quantity * self.quantity
        if (transaction.transaction_type == Transaction.INPUT):
            self.updateAvgCost(stock, stock_quantity)

        else:
            stock.quantity = stock.quantity - stock_quantity

        if (transaction.transaction_type == Transaction.TRANSFER):
            to_stock = Stock.objects.filter(product_id=self.product_id).filter(
                warehouse_id=transaction.transfer_to_warehouse_id).first()
            if (to_stock == None):
                to_stock = Stock.objects.create(product_id=self.product_id,
                                                warehouse_id=transaction.transfer_to_warehouse_id, quantity=0)
            self.updateAvgCost(to_stock, stock_quantity)
            to_stock.save()

        stock.save()

    def save(self, *args, **kwargs):
        super(TransactionDetail, self).save(*args, **kwargs)
        self.updateStock()
