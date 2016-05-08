from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.SalesArea import SalesArea
from sales.serializers.SalesArea import SalesAreaSerializer
from main.mixin import AtomicMixin
from django.contrib.auth.decorators import permission_required

@login_required()
@permission_required('add_warehouse')
def salesarea(request):
    return render(request,"sales/salesArea.html")


class SalesAreaList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = SalesArea.objects.all()
    serializer_class = SalesAreaSerializer


