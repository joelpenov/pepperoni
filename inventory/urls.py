from django.conf.urls import url

from inventory import views


def registerApiUrls(router):
	router.register(r'warehouse', views.WarehouseList)

urlpatterns=[
		url(r'^warehouse/', views.warehouse)
	]