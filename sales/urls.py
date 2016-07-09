from django.conf.urls import url
from sales.views import Customer
from sales.views import CashRegister
from sales.views import CashierShift
from sales.views import Order
from sales.views import SalesArea

def registerApiUrls(router):
	router.register(r'customers', Customer.CustomerList)
	router.register(r'cashregisters', CashRegister.CashRegisterList)
	router.register(r'cashiershifts', CashierShift.CashierShiftList)
	router.register(r'orders', Order.OrderList)
	router.register(r'orderdelivered', Order.SetOrderDeliverStatusView)
	router.register(r'toporders', Order.TopOrderList)
	router.register(r'salesarea', SalesArea.SalesAreaList)
	
urlpatterns=[
		url(r'cashregisters', CashRegister.cashRegisters),
		url(r'pointofsales', Order.pointOfSales),
		url(r'customers', Customer.customers),
		url(r'cashiershifts', CashierShift.cashiershifts),
		url(r'cashiershifts', CashierShift.cashiershifts),
		url(r'salesarea', SalesArea.salesarea),
		url(r'printinvoice', Order.print_invoice),
		url(r'printshiftstock', CashierShift.print_shift_stock)
	]