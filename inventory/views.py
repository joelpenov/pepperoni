from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import WarehouseSerializer
from .models import Warehouse


# uncomment this to require login
# @login_required()
def warehouse(request):
	return render(request,"inventory/warehouse.html")


class WarehouseList(viewsets.ModelViewSet):
	queryset = Warehouse.objects.all()
	serializer_class = WarehouseSerializer