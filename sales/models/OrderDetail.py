from django.db import models
from sales.models.Order import Order
from inventory.models import Product


class OrderDetail(models.Model):
	order = models.ForeignKey(Order, related_name='details')
	product = models.ForeignKey(Product, related_name='sale_order_details')
	quantity = models.FloatField()
	price = models.FloatField()
	total = models.FloatField()