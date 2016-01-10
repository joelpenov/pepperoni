from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import generics, viewsets
from .forms import ProductForm
from .serializers import ProductSerializer
from .models import Product


# uncomment this to require login
# @login_required()
# Create your views here.
# {% load rest_framework %}
# <h1>Test serializer</h1>
# {%  render_form serializer template_pack='rest_framework/horizontal' %}
def index(request):
	form = ProductForm()
	# context = {"form": form, "serializer": ProductSerializer}
	context = {"form": form}
	return render(request,"products/index.html", context)


# @login_required()
def create(request):
	form = ProductForm(request.POST)
	if form.is_valid():
		form.save()
	return render(request,"products/index.html", {"form": form})


class ProductList(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveUpdateAPIView):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer