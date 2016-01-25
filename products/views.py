from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions

from .serializers import ProductSerializer
from .models import Product


@login_required()
def index(request):
	return render(request,"products/index.html")


class ProductList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Product.objects.all()
	serializer_class = ProductSerializer