from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import WarehouseSerializer, InventoryMoveSerializer
from .models import Warehouse, InventoryMove


# uncomment this to require login
# @login_required()
def warehouse(request):
	return render(request,"inventory/warehouse.html")


def inventoryInput(request):
	return render(request,"inventory/InventoryInput.html")


def inventoryOutput(request):
	return render(request,"inventory/InventoryOutput.html")


class WarehouseList(viewsets.ModelViewSet):
	queryset = Warehouse.objects.all()
	serializer_class = WarehouseSerializer


class InventoryInputList(viewsets.ModelViewSet):
	queryset = InventoryMove.objects.filter(transaction_type=InventoryMove.INPUT)
	serializer_class = InventoryMoveSerializer

	def get_serializer_context(self):
		return {'request': self.request, 'transaction_type':InventoryMove.INPUT}


class InventoryOutputList(viewsets.ModelViewSet):
	queryset = InventoryMove.objects.filter(transaction_type=InventoryMove.OUTPUT)
	serializer_class = InventoryMoveSerializer

	def get_serializer_context(self):
		return {'request': self.request, 'transaction_type':InventoryMove.OUTPUT}