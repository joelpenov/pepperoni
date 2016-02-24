from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters

from .models.CashRegister import CashRegister
from .models.CashierShift import CashierShift
from .models.Customer import Customer
from .models.Order import Order
from .models.SalesArea import SalesArea
from .serializers import CashRegisterSerializer, CustomerSerializer, CashierShiftSerializer, OrderSerializer, SalesAreaSerializer


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


@login_required()
def salesarea(request):
    return render(request,"sales/salesarea.html")


class SalesAreaList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = SalesArea.objects.all()
    serializer_class = SalesAreaSerializer


class CashRegisterList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashRegister.objects.all()
    serializer_class = CashRegisterSerializer


class OrderList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('cashier_shift','status',)

class TopOrderList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Order.objects.filter(status=Order.FINISHED).order_by('-created_date')
    serializer_class = OrderSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('customer_phone',)
    http_method_names = ['get']

    def filter_queryset(self, queryset):
        query = super(TopOrderList, self).filter_queryset(queryset)
        return query[:10]


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