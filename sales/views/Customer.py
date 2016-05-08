from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.Customer import Customer
from sales.serializers.Customer import CustomerSerializer
from main.mixin import AtomicMixin
from django.contrib.auth.decorators import permission_required

@login_required()
@permission_required('add_warehouse')
def customers(request):
    return render(request,"sales/customer.html")


class CustomerList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('phone','name',)

