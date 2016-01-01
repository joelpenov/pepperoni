from django.db import models
from products.models import Product

# Create your models here.
class WhereHouse(models.Model):
	name = models.CharField(max_length=50)

class InventoryTransaction(models.Model):
	wherehouse_id = models.ForeingField(WhereHouse, "fk_existence_wherehouse_id")
	transaction_type = models.IntegerField()
	quantity_type = models.FloatField()
	price = models.FloatField()
	
