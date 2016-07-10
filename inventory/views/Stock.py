from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from inventory.models.Stock import Stock
from inventory.serializers.Stock import StockSerializer
from main.mixin import AtomicMixin
from django.contrib.auth.decorators import permission_required


# admin_user
@login_required()
@permission_required('add_warehouse')
def stock(request):
	return render(request,"inventory/InventoryStock.html")


class WerehouseStockList(AtomicMixin, viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Stock.objects.all()
	serializer_class = StockSerializer
	filter_backends = (filters.DjangoFilterBackend,)
	filter_fields = ('warehouse_id', 'product_id',)
