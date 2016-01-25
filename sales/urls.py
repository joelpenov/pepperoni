from django.conf.urls import url
from sales import views

def registerApiUrls(router):
	router.register(r'customers', views.CustomerList)
	router.register(r'cashregisters', views.CashRegisterList)

urlpatterns=[
		url(r'cashregisters', views.cashRegisters),
		url(r'pointofsales', views.pointOfSales),
		url(r'customers', views.customers),
	]