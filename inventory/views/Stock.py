from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from inventory.models.Stock import Stock
from inventory.serializers.Stock import StockSerializer


@login_required()
def stock(request):
	return render(request,"inventory/InventoryStock.html")


class WerehouseStockList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Stock.objects.all()
	serializer_class = StockSerializer
