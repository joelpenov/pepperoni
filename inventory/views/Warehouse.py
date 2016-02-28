from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from inventory.models.Warehouse import Warehouse
from inventory.serializers.Warehouse import WarehouseSerializer
from main.mixin import AtomicMixin

@login_required()
def warehouse(request):
	return render(request,"inventory/warehouse.html")


class WarehouseList(AtomicMixin, viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Warehouse.objects.all()
	serializer_class = WarehouseSerializer

