from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.SalesArea import SalesArea
from sales.serializers.SalesArea import SalesAreaSerializer
from main.mixin import AtomicMixin


@login_required()
def salesarea(request):
    return render(request,"sales/salesarea.html")


class SalesAreaList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = SalesArea.objects.all()
    serializer_class = SalesAreaSerializer


