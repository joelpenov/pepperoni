from django.db import models
from django.contrib.auth.models import User
from inventory.models import Product, Warehouse


class SalesArea(models.Model):
	name = models.CharField(max_length=70)

	def __str__(self):
		return self.name


class CashRegister(models.Model):
	name = models.CharField(max_length=70)
	warehouse= models.ForeignKey(Warehouse,related_name='cash_registers')

	def __str__(self):
		return self.name+' - '+self.warehouse.name


class CashierShift(models.Model):
	ACTIVE = 'ACTIVE'
	CLOSE = 'CLOSE'
	SHIFT_STATUS = (
		(ACTIVE, 'Activo'),
		(CLOSE, 'Cerrado'),
	)

	user = models.ForeignKey(User, related_name='cashier_users')
	cash_register = models.ForeignKey(CashRegister,related_name='cashier_shifts')
	start_date= models.DateTimeField(auto_now_add=True)
	end_date= models.DateTimeField(null=True, default=None)
	close_balance = models.FloatField(null=True)
	status = models.CharField(max_length=15, choices=SHIFT_STATUS)


class Customer(models.Model):
	name = models.CharField(max_length=70)
	address = models.CharField(max_length=180, blank=True)
	reference = models.CharField(max_length=180, blank=True)
	phone = models.CharField(max_length=15, unique=True, db_index=True)

	def __str__(self):
		return self.name


class OrderNumber(models.Model):
	cashier_shift = models.ForeignKey(CashierShift,related_name='numbers')
	number = models.IntegerField()


class Order(models.Model):
	ACTIVE = 'ACTIVE'
	FINISHED = 'FINISHED'
	VOID = 'VOID'
	ORDER_STATUS = (
		(ACTIVE, 'Activo'),
		(FINISHED, 'Terminada'),
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