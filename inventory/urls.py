from django.conf.urls import url

from inventory.views import Warehouse
from inventory.views import Transaction
from inventory.views import Product
from inventory.views import Stock


def registerApiUrls(router):
	router.register(r'warehouses', Warehouse.WarehouseList)
	router.register(r'inventoryinputs', Transaction.InventoryInputList)
	router.register(r'inventoryoutputs', Transaction.InventoryOutputList)
	router.register(r'products', Product.ProductList)
	router.register(r'stocks', Stock.WerehouseStockList)

urlpatterns=[
		url(r'^warehouse/', Warehouse.warehouse),
		url(r'^inputs/', Transaction.inventoryInput),
		url(r'^outputs/', Transaction.inventoryOutput),
		url(r'^products/', Product.product),
		url(r'^stock/', Stock.stock),
		url(r'^transfer/', Transaction.inventoryTransfer)
	]