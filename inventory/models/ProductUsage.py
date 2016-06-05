from django.db import models
from inventory.models.UnitOfMeasure import UnitOfMeasure
from inventory.models.Product import Product
from inventory.models.Warehouse import Warehouse
from django.contrib.auth.models import User


class ProductUsage(models.Model):
    ACTIVE = 'ACTIVE'
    FINISHED = 'FINISHED'
    VOID = 'VOID'
    ORDER_STATUS = (
        (ACTIVE, 'Activo'),
        (FINISHED, 'Terminado'),
        (VOID, 'Nulo'),
    )

    warehouse = models.ForeignKey(Warehouse, related_name="warehouse_product_usages")
    user = models.ForeignKey(User, related_name="user_product_usages")
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=15, choices=ORDER_STATUS)


class ProductUsageDetail(models.Model):
    product_usage = models.ForeignKey(ProductUsage, related_name="details")
    included_in_output = models.BooleanField()
    unit_quantity = models.FloatField(default=1)
    unit_of_measure = models.ForeignKey(UnitOfMeasure, related_name="product_usage_units")
    product = models.ForeignKey(Product, related_name="product_usages")
    old_stock = models.FloatField()
    new_stock = models.FloatField()
    stock_usage = models.FloatField()