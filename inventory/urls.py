from django.conf.urls import url

from inventory import views


def registerApiUrls(router):
	router.register(r'warehouses', views.WarehouseList)
	router.register(r'inventoryinputs', views.InventoryInputList)
	router.register(r'inventoryoutputs', views.InventoryOutputList)

urlpatterns=[
		url(r'^warehouse/', views.warehouse),
		url(r'^inputs/', views.inventoryInput),
		url(r'^outputs/', views.inventoryOutput),
	]