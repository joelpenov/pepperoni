from django.shortcuts import render
from .models import Customer
from rest_framework import generics, viewsets
from .serializers import CustomerSerializer


def index(request):
	return render(request,"customer/index.html")


class CustomerList(viewsets.ModelViewSet):
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer
