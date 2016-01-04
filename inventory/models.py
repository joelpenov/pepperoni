from django.db import models
from products.models import Product

# Create your models here.
class Store(models.Model):
	name = models.CharField(max_length=50)

class InventoryMove(models.Model):
	store = models.ForeignKey(Store, related_name="fk_inventory_move_store", null=True, default=None)
	transaction_type = models.IntegerField()
	quantity_type = models.FloatField()
	price = models.FloatField()
