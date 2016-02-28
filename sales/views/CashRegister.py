from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.CashRegister import CashRegister
from sales.serializers.CashRegister import CashRegisterSerializer
from main.mixin import AtomicMixin


@login_required()
def cashRegisters(request):
    return render(request,"sales/cashRegisters.html")


class CashRegisterList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashRegister.objects.all()
    serializer_class = CashRegisterSerializer