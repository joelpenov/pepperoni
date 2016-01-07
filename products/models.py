from django.db import models

# Create your models here.
class Product(models.Model):
	description = models.CharField(max_length=255)
	cost = models.FloatField(default=0)
	average_cost = models.FloatField(default=0)
	sell_price = models.FloatField(default=0)
	stock = models.FloatField(default=0)
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()