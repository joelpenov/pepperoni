from django.db import models
from inventory.models.Warehouse import Warehouse
from inventory.models.Product import Product


class Stock(models.Model):
	product = models.ForeignKey(Product, related_name="product_stock")
	warehouse = models.ForeignKey(Warehouse, related_name="warehouse_stock")
	quantity = models.FloatField()
