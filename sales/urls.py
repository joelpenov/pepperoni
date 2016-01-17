from django.conf.urls import url
from sales import views

def registerApiUrls(router):
	router.register(r'cashregisters', views.CashRegisterList)

urlpatterns=[
		url(r'cashregisters', views.cashRegisters),
		url(r'pointofsales', views.pointOfSales),
	]