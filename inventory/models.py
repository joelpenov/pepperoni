from django.db import models

# Create your models here.
class Product(models.Model):
	description = models.CharField(max_length=255)
	cost = models.FloatField()
	average_cost = models.FloatField()
	sell_price = models.FloatField()
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()
