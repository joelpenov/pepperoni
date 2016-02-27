from django.db import models
from django.contrib.auth.models import User
from sales.models.CashRegister import CashRegister

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
	start_balance = models.FloatField()
	close_balance = models.FloatField(null=True)
	status = models.CharField(max_length=15, choices=SHIFT_STATUS)