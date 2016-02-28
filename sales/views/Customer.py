from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.Customer import Customer
from sales.serializers.Customer import CustomerSerializer
from main.mixin import AtomicMixin


@login_required()
def customers(request):
    return render(request,"sales/customer.html")


class CustomerList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('phone','name',)

