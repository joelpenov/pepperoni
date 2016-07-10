from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from main.mixin import AtomicMixin
from django.contrib.auth.models import User
from django.contrib.auth.decorators import permission_required
from sales.serializers.CashierUserSerializer import CashierUserSerializer

@login_required()
@permission_required('add_warehouse')
def report_shifts(request):
    return render(request, "sales/salesReportShift.html")

@login_required()
@permission_required('add_warehouse')
def report_shifts_service(request):
    pass

class CashierUserList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.exclude(username='crunchy')
    serializer_class = CashierUserSerializer