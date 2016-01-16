from django.conf.urls import url

from customer import views

def registerApiUrls(router):
	router.register(r'customer', views.CustomerList)

urlpatterns=[
		url(r'', views.index),
	]