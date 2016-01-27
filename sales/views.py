from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters

from .models import CashRegister, Customer
from .serializers import CashRegisterSerializer, CustomerSerializer


@login_required()
def cashRegisters(request):
    return render(request,"sales/cashRegisters.html")


@login_required()
def pointOfSales(request):
    return render(request,"sales/pointOfSales.html")


@login_required()
def customers(request):
    return render(request,"sales/customer.html")


class CashRegisterList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashRegister.objects.all()
    serializer_class = CashRegisterSerializer


class CustomerList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('phone','name',)