from django.db import models
from inventory.models.UnitOfMeasure import UnitOfMeasure

class Product(models.Model):
	description = models.CharField(max_length=255)
	sell_price = models.FloatField(default=0)
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()
	unit_of_measure = models.ForeignKey(UnitOfMeasure,"product_units")

	def __str__(self):
		return self.description
