from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions

from .models import CashRegister
from .serializers import CashRegisterSerializer


@login_required()
def cashRegisters(request):
	return render(request,"sales/cashRegisters.html")


@login_required()
def pointOfSales(request):
	return render(request,"sales/pointOfSales.html")


class CashRegisterList(viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = CashRegister.objects.all()
	serializer_class = CashRegisterSerializer