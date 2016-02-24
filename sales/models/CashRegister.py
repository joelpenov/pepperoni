from django.db import models
from inventory.models import Warehouse

class CashRegister(models.Model):
	name = models.CharField(max_length=70)
	warehouse= models.ForeignKey(Warehouse,related_name='cash_registers')

	def __str__(self):
		return self.name+' - '+self.warehouse.name