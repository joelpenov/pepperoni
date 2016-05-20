from django.db import models
from inventory.models.UnitOfMeasure import  UnitOfMeasure
from inventory.models.Product import Product


class ProductUsage(models.Model):
    included_in_output =  models.BooleanField()
    unit_of_measure = models.ForeignKey(UnitOfMeasure,related_name= "product_usage_units")
    product = models.ForeignKey(Product,related_name= "product_usages")
    old_stock = models.FloatField()
    new_stock = models.FloatField()
    stock_usage = models.FloatField()
    show_in_menu= models.BooleanField()