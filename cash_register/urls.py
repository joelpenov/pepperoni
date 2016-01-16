from django.conf.urls import url
from cash_register import views

def registerApiUrls(router):
	router.register(r'cashregisters', views.CashRegisterList)

urlpatterns=[
		url(r'', views.index),
	]