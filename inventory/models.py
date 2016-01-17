
from django.db import models
from enum import Enum
from products.models import Product

class Warehouse(models.Model):
	id = models.IntegerField(primary_key=True)
	name = models.CharField(max_length=50)

class InventoryMove(models.Model):
	id = models.IntegerField(primary_key=True)
	Warehouse = models.ForeignKey(Warehouse, related_name="fk_inventory_move_warehouse", default=None)
	transaction_type = models.IntegerField()

class InventoryMoveDetail(models.Model):
	id = models.IntegerField(primary_key=True)
	InventoryMove = models.ForeignKey(InventoryMove, related_name="fk_inventory_move_detail_inventory_move", default=None)
	Product = models.ForeignKey(Product, related_name="fk_inventory_move_detail_product", default=None)
	quantity = models.FloatField()
	cost = models.FloatField()
	price = models.FloatField()

class TransactionType(Enum):
	Input = 1
	Output = 2
	Transfer = 3