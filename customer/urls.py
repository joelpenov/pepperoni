from django.conf.urls import url

from customer import views

def registerApiUrls(router):
	router.register(r'customers', views.CustomerList)

urlpatterns=[
		url(r'', views.index),
	]