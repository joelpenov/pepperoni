from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.CashierShift import CashierShift
from sales.serializers.CashierShift import CashierShiftSerializer
from main.mixin import AtomicMixin

@login_required()
def cashiershifts(request):
    return render(request,"sales/cashierShift.html")

class CashierShiftList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashierShift.objects.all()
    serializer_class = CashierShiftSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('user','status',)