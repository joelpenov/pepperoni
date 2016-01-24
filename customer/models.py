from django.db import models


class Customer(models.Model):
	name = models.CharField(max_length=70)
	address = models.CharField(max_length=180, blank=True)
	reference = models.CharField(max_length=180, blank=True)
	phone = models.CharField(max_length=15, unique=True)