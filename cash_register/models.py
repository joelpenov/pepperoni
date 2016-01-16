from django.db import models

class CashRegister(models.Model):
	id = models.IntegerField(primary_key=True)
	name = models.CharField(max_length=70)