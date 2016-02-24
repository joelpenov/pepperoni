from django.db import models
from sales.models import CashierShift


class OrderNumber(models.Model):
	cashier_shift = models.ForeignKey(CashierShift,related_name='numbers')
	number = models.IntegerField()