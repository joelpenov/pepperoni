from django.shortcuts import render
from .models import CashRegister
from rest_framework import generics, viewsets
from .serializers import CashRegisterSerializer


def cashRegisters(request):
	return render(request,"sales/cashRegisters.html")


def pointOfSales(request):
	return render(request,"sales/pointOfSales.html")


class CashRegisterList(viewsets.ModelViewSet):
	queryset = CashRegister.objects.all()
	serializer_class = CashRegisterSerializer