from django.db import models
from inventory.models.Warehouse import Warehouse
from inventory.models.Stock import Stock
from inventory.models.Product import Product


class Transaction(models.Model):
	INPUT = 'INPUT'
	OUTPUT = 'OUTPUT'
	TRANSFER = 'TRANSFER'
	MOVE_TYPE_CHOICES = (
		(INPUT, 'Entrada'),
		(OUTPUT, 'Salida'),
		(TRANSFER, 'Transferencia'),
	)

	warehouse = models.ForeignKey(Warehouse, related_name="inventory_moves")
	transaction_type = models.CharField(max_length=20, choices=MOVE_TYPE_CHOICES)
	transaction_date = models.DateField()
	note = models.CharField(max_length=320, null=True, blank=True)
	#transaction_id = models.UUIDField()


class TransactionDetail(models.Model):
	inventory_move = models.ForeignKey(Transaction, related_name="details")
	product = models.ForeignKey(Product, related_name="inventory_move_details")
	quantity = models.FloatField()
	price = models.FloatField()
	total = models.FloatField()


	def updateStock(self):
		move =self.inventory_move;
		stock = Stock.objects.filter(product_id=self.product_id).filter(warehouse_id=move.warehouse_id).first()
		if(stock==None):
			stock = Stock.objects.create(product_id=self.product_id, warehouse_id  = move.warehouse_id, quantity = 0)

		if(move.transaction_type==Transaction.INPUT):
			stock.quantity = stock.quantity + self.quantity

		else:
			stock.quantity = stock.quantity - self.quantity

		#if(move.transaction_type==InventoryMove.TRANSFER):
			#stock.quantity = stock.quantity + self.quantity sumar al otro

		stock.save()


	def save(self, *args, **kwargs):
		super(TransactionDetail, self).save(*args, **kwargs)
		self.updateStock()
