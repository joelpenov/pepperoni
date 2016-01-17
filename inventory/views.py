from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import WarehouseSerializer, InventoryMoveSerializer
from .models import Warehouse, InventoryMove


# uncomment this to require login
# @login_required()
def warehouse(request):
	return render(request,"inventory/warehouse.html")

class WarehouseList(viewsets.ModelViewSet):
	queryset = Warehouse.objects.all()
	serializer_class = WarehouseSerializer

class InventoryMoveList(viewsets.ModelViewSet):
	queryset = InventoryMove.objects.all()
	serializer_class = InventoryMoveSerializer