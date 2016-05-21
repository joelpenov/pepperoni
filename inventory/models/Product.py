from django.db import models

class Product(models.Model):
	description = models.CharField(max_length=255)
	sell_price = models.FloatField(default=0)
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()
	print_on_cashier_shift = models.BooleanField(default=False, blank=False)

	def __str__(self):
		return self.description