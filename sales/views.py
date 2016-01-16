from django.shortcuts import render
from .models import CashRegister
from rest_framework import generics, viewsets
from .serializers import CashRegisterSerializer


def cashregisters(request):
	return render(request,"sales/cashregisters.html")

class CashRegisterList(viewsets.ModelViewSet):
	queryset = CashRegister.objects.all()
	serializer_class = CashRegisterSerializer