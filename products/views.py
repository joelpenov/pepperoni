from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import ProductSerializer
from .models import Product


# uncomment this to require login
# @login_required()
def index(request):
	return render(request,"products/index.html")


class ProductList(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer