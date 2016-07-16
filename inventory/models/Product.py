from django.db import models
from inventory.models.UnitOfMeasure import UnitOfMeasure

class Product(models.Model):
	description = models.CharField(max_length=255)
	sell_price = models.FloatField(default=0)
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()
	is_finish_product= models.BooleanField(default=0)
	unit_of_measure = models.ForeignKey(UnitOfMeasure, related_name= 'product_units', null=True)
	unit_quantity= models.FloatField(default=1)
	print_on_cashier_shift = models.BooleanField(default=False, blank=False)

	def __str__(self):
		return self.description
