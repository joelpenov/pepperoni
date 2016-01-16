from django.db import models
from products.models import Product


# Create your models here.
class Warehouse(models.Model):
	id = models.IntegerField(primary_key=True)
	name = models.CharField(max_length=50)


class InventoryMove(models.Model):
	Warehouse = models.ForeignKey(Warehouse, related_name="fk_inventory_move_warehoure", null=True, default=None)
	transaction_type = models.IntegerField()
	quantity_type = models.FloatField()
	price = models.FloatField()

