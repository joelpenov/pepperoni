
from django.db import models
from enum import Enum
from products.models import Product

class TransactionType(Enum):
	Input = 1
	Output = 2
	Transfer = 3

class Warehouse(models.Model):
	id = models.IntegerField(primary_key=True)
	name = models.CharField(max_length=50)

	def __str__(self):
		return self.name


class TransactionType(Enum):
	Input = 1
	Output = 2
	Transfer = 3


class InventoryMove(models.Model):
	TRANSACTION_TYPES = (
        (TransactionType.Input.value, 'Entradas'),
        (TransactionType.Output.value, 'Salidas'),
        (TransactionType.Transfer.value, 'Transferencias'),
    )

	id = models.IntegerField(primary_key=True)
	warehouse = models.ForeignKey(Warehouse, related_name="fk_inventory_move_warehouse", default=None)
	transaction_type = models.IntegerField(choices=TRANSACTION_TYPES)
	transaction_date = models.DateField()
	#transaction_id = models.UUIDField()


class InventoryMoveDetail(models.Model):
	id = models.IntegerField(primary_key=True)
	InventoryMove = models.ForeignKey(InventoryMove, related_name="fk_inventory_move_detail_inventory_move", default=None)
	Product = models.ForeignKey(Product, related_name="fk_inventory_move_detail_product", default=None)
	quantity = models.FloatField()
	cost = models.FloatField()
	price = models.FloatField()

