from django.conf.urls import url
from sales import views

def registerApiUrls(router):
	router.register(r'customers', views.CustomerList)
	router.register(r'cashregisters', views.CashRegisterList)
	router.register(r'cashiershifts', views.CashierShiftList)
	router.register(r'orders', views.OrderList)

urlpatterns=[
		url(r'cashregisters', views.cashRegisters),
		url(r'pointofsales', views.pointOfSales),
		url(r'customers', views.customers),
		url(r'cashiershifts', views.cashiershifts),
	]