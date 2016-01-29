from django.db import models
from django.contrib.auth.models import User
from inventory.models import Product, Warehouse


class CashRegister(models.Model):
	name = models.CharField(max_length=70)
	warehouse= models.ForeignKey(Warehouse,related_name='cash_registers')
	#Open, Close
	status = models.CharField(max_length=15)

	def __str__(self):
		return self.name


class CashierShift(models.Model):
	user = models.ForeignKey(User, related_name='cashier_users')
	cash_register = models.ForeignKey(CashRegister,related_name='cashier_shifts')
	start_date= models.DateTimeField(auto_now_add=True)
	end_date= models.DateTimeField(blank=True)
	close_balance = models.FloatField(blank=True)


class Customer(models.Model):
	name = models.CharField(max_length=70)
	address = models.CharField(max_length=180, blank=True)
	reference = models.CharField(max_length=180, blank=True)
	phone = models.CharField(max_length=15, unique=True, db_index=True)

	def __str__(self):
		return self.name


class Order(models.Model):
	customer = models.ForeignKey(Customer)
	customer_name = models.CharField(max_length=70, blank=True)
	customer_address = models.CharField(max_length=180, blank=True)
	customer_reference = models.CharField(max_length=180, blank=True)
	customer_phone = models.CharField(max_length=15, blank=True)

	order_number = models.IntegerField()
	order_date= models.DateTimeField()
	#Active, Finished, Canceled, clear?
	status = models.CharField(max_length=15)
	cashier_shift = models.ForeignKey(CashierShift,related_name='orders')

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