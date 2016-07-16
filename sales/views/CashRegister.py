from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from sales.models.CashRegister import CashRegister
from sales.serializers.CashRegister import CashRegisterSerializer
from main.mixin import AtomicMixin
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import permission_required

@login_required()
@permission_required('add_warehouse')
def cashRegisters(request):
    return render(request,"sales/cashregisters.html")


class CashRegisterList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashRegister.objects.all()
    serializer_class = CashRegisterSerializer