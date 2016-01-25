from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions

from .models import Customer
from .serializers import CustomerSerializer

@login_required()
def index(request):
	return render(request,"customer/index.html")


class CustomerList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer
