from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from inventory.models.Product import Product
from inventory.serializers.Product import ProductSerializer


@login_required()
def product(request):
	return render(request,"inventory/product.html")


class ProductList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Product.objects.all()
	serializer_class = ProductSerializer
	filter_backends = (filters.DjangoFilterBackend,)
	filter_fields = ('description', 'show_in_menu','is_raw_material',)
