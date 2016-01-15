from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Customer
from rest_framework import generics, viewsets
from .serializers import CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateAPIView):
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer

class CustomerList(viewsets.ModelViewSet):
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer
