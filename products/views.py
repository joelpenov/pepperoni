from django.shortcuts import render
from .forms import ProductForm
from django.http import HttpResponse
from django.views import generic
# Create your views here.
def index(request):
	form = ProductForm()
	context = {"form": form}
	return render(request,"products/index.html", context)