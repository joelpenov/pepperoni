from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from inventory.models.UnitOfMeasure import UnitOfMeasure
from inventory.serializers.UnitOfMeaure import UnitOfMeasureSerializer
from main.mixin import AtomicMixin
from django.contrib.auth.decorators import permission_required


@login_required()
@permission_required('add_warehouse')
def unitOfMeasure(request):
    return render(request, "inventory/unitOfMeasure.html")


class UnitOfMeasureList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes = ((permissions.IsAuthenticated),)
    queryset = UnitOfMeasure.objects.all()
    serializer_class = UnitOfMeasureSerializer
