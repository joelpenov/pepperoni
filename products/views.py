from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .forms import ProductForm


# uncomment this to require login
# @login_required()
# Create your views here.
def index(request):
	form = ProductForm()
	context = {"form": form}
	return render(request,"products/index.html", context)


# @login_required()
def create(request):
	form = ProductForm(request.POST)
	if form.is_valid():
		form.save()
	return render(request,"products/index.html", {"form": form})