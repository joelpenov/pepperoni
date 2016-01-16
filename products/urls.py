from django.conf.urls import url

from products import views


def registerApiUrls(router):
	router.register(r'products', views.ProductList)

urlpatterns=[
		url(r'', views.index),
	]
