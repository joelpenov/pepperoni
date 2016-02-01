from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters

from .models import CashRegister, Customer, CashierShift
from .serializers import CashRegisterSerializer, CustomerSerializer, CashierShiftSerializer


@login_required()
def cashRegisters(request):
    return render(request,"sales/cashRegisters.html")


@login_required()
def pointOfSales(request):
    return render(request,"sales/pointOfSales.html")


@login_required()
def customers(request):
    return render(request,"sales/customer.html")

@login_required()
def cashiershifts(request):
    return render(request,"sales/cashierShift.html")


class CashRegisterList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashRegister.objects.all()
    serializer_class = CashRegisterSerializer


class CashierShiftList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashierShift.objects.all()
    serializer_class = CashierShiftSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('user','status',)


class CustomerList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('phone','name',)