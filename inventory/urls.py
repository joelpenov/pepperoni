from django.conf.urls import url

from inventory import views


def registerApiUrls(router):
	router.register(r'warehouses', views.WarehouseList)
	router.register(r'inventorymoves', views.InventoryMoveList)

urlpatterns=[
		url(r'^warehouse/', views.warehouse)
	]