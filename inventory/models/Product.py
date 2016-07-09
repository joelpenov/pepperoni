from django.db import models
from inventory.models.UnitOfMeasure import UnitOfMeasure

class Product(models.Model):
	description = models.CharField(max_length=255)
	sell_price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()
	is_finish_product= models.BooleanField(default=0)
	unit_of_measure = models.ForeignKey(UnitOfMeasure, related_name= 'product_units', null=True)
	unit_quantity= models.FloatField(default=1)

	def __str__(self):
		return self.description
