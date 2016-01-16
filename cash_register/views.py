from django.shortcuts import render
from .models import CashRegister
from rest_framework import generics, viewsets
from .serializers import CashRegisterSerializer


def index(request):
	return render(request,"cash_register/index.html")

class CashRegisterList(viewsets.ModelViewSet):
	queryset = CashRegister.objects.all()
	serializer_class = CashRegisterSerializer