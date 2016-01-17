from django.db import models
from products.models import Product


class Warehouse(models.Model):
	id = models.IntegerField(primary_key=True)
	name = models.CharField(max_length=50)

	def __str__(self):
		return self.name


class InventoryMove(models.Model):
	INPUT = 'INPUT'
	OUTPUT = 'OUTPUT'
	TRANSFER = 'TRANSFER'
	MOVE_TYPE_CHOICES = (
        (INPUT, 'Entrada'),
        (OUTPUT, 'Salida'),
        (TRANSFER, 'Transferencia'),
    )

	id = models.IntegerField(primary_key=True)
	warehouse = models.ForeignKey(Warehouse, related_name="inventory_moves", default=None)
	transaction_type = models.CharField(max_length=20, choices=MOVE_TYPE_CHOICES)
	transaction_date = models.DateField()
	#transaction_id = models.UUIDField()


class InventoryMoveDetail(models.Model):
	id = models.IntegerField(primary_key=True)
	inventory_move = models.ForeignKey(InventoryMove, related_name="details", default=None)
	product = models.ForeignKey(Product, related_name="inventory_move_details", default=None)
	quantity = models.FloatField()
	price = models.FloatField()


