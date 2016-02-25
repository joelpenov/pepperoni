from django.db import models
from sales.models.SalesArea import SalesArea
from sales.models.CashierShift import CashierShift
from sales.models.Customer import Customer
from inventory.models.Product import Product

class Order(models.Model):
	ACTIVE = 'ACTIVE'
	FINISHED = 'FINISHED'
	VOID = 'VOID'
	ORDER_STATUS = (
		(ACTIVE, 'Activo'),
		(FINISHED, 'Terminado'),
		(VOID, 'Nulo'),
	)

	created_date= models.DateTimeField(auto_now_add=True)
	sales_area = models.ForeignKey(SalesArea,related_name='orders', null=True)


	number = models.IntegerField()
	clear= models.BooleanField(default=False)
	to_go= models.BooleanField(default=False)
	to_pickup= models.BooleanField(default=False)
	delivered= models.BooleanField(default=False)
	status = models.CharField(max_length=15, choices=ORDER_STATUS)
	cashier_shift = models.ForeignKey(CashierShift,related_name='orders')


	customer = models.ForeignKey(Customer, null=True)
	customer_name = models.CharField(max_length=70, blank=True)
	customer_address = models.CharField(max_length=180, blank=True)
	customer_reference = models.CharField(max_length=180, blank=True)
	customer_phone = models.CharField(max_length=15, blank=True)
	update_customer_entry= models.BooleanField(default=False)


	total = models.FloatField()
	cash = models.FloatField()
	customer_change = models.FloatField()

	#class Meta:
		#unique_together = (('slug','category'),)


class OrderDetail(models.Model):
	order = models.ForeignKey(Order, related_name='details')
	product = models.ForeignKey(Product, related_name='sale_order_details')
	quantity = models.FloatField()
	price = models.FloatField()
	total = models.FloatField()
