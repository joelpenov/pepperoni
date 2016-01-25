from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions
from .serializers import WarehouseSerializer, InventoryMoveSerializer, ProductSerializer
from .models import Warehouse, InventoryMove, Product


@login_required()
def warehouse(request):
	return render(request,"inventory/warehouse.html")

@login_required()
def inventoryInput(request):
	return render(request,"inventory/InventoryInput.html")

@login_required()
def inventoryOutput(request):
	return render(request,"inventory/InventoryOutput.html")


@login_required()
def product(request):
	return render(request,"inventory/product.html")


class ProductList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class WarehouseList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Warehouse.objects.all()
	serializer_class = WarehouseSerializer


class InventoryInputList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = InventoryMove.objects.filter(transaction_type=InventoryMove.INPUT)
	serializer_class = InventoryMoveSerializer

	def get_serializer_context(self):
		return {'request': self.request, 'transaction_type':InventoryMove.INPUT}


class InventoryOutputList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = InventoryMove.objects.filter(transaction_type=InventoryMove.OUTPUT)
	serializer_class = InventoryMoveSerializer

	def get_serializer_context(self):
		return {'request': self.request, 'transaction_type':InventoryMove.OUTPUT}