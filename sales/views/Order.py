from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.Order import Order
from sales.serializers.Order import OrderSerializer
from main.mixin import AtomicMixin
from rest_framework.views import APIView

from io import BytesIO
from sales.invoice_canvas import InvoicePrinter
from sales.pdfprinter import print_pdf
from django.http import JsonResponse


@login_required()
def pointOfSales(request):
    return render(request,"sales/pointOfSales.html")


class OrderPrinter(APIView):
    def get(self, request, *args, **kw):
        permission_classes =((permissions.IsAuthenticated),)
        invoice_id = request.GET.get('invoiceid', None)
        if not invoice_id and not invoice_id.isdigit():
            return JsonResponse({'success_printing': False})

        invoice_id = int(invoice_id)

        order = Order.objects.get(pk= invoice_id)

        file_path = InvoicePrinter.draw_pdf(BytesIO(), order)
        success_printing = print_pdf(file_path)
        return JsonResponse({'success_printing': success_printing})
        

class OrderList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('cashier_shift','status',)

class TopOrderList(viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = Order.objects.filter(status=Order.FINISHED).order_by('-created_date')
    serializer_class = OrderSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('customer_phone',)
    http_method_names = ['get']

    def filter_queryset(self, queryset):
        query = super(TopOrderList, self).filter_queryset(queryset)
        return query[:10]