from django.db import models

# Create your models here.
class Product(models.Model):
	description = models.CharField(max_length=255)
	sell_price = models.FloatField(default=0)
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()

	def __str__(self):
		return "{0}".format(self.description)