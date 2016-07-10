from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.Order import Order, OrderDetail
from sales.serializers.Order import OrderSerializer, SetOrderDeliverStatusSerializer
from main.mixin import AtomicMixin
from sales.invoice_generation.invoice_canvas import PdfGenerator
from sales.invoice_generation.pdfprinter import print_pdf
from django.http import JsonResponse


@login_required()
def pointOfSales(request):
    return render(request, "sales/pointOfSales.html")


@login_required
def print_invoice(request):
    invoice_id = request.GET.get('invoiceid', None)
    if not invoice_id and not invoice_id.isdigit():
        return JsonResponse({'success_printing': False})

    invoice_id = int(invoice_id)

    order = Order.objects.get(pk=invoice_id)
    if not order:
        return JsonResponse({'success_printing': False})

    details = OrderDetail.objects.filter(order__pk=invoice_id)

    pdfgenerator = PdfGenerator()
    pdfgenerator.draw_invoice_pdf(order, details)

    if order.status is not "FINISHED" and not order.printed:
        order.printed = True
        order.save()

    return JsonResponse({'success_printing': True})


class OrderList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes = ((permissions.IsAuthenticated),)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('cashier_shift', 'status',)


class TopOrderList(viewsets.ModelViewSet):
    permission_classes = ((permissions.IsAuthenticated),)
    queryset = Order.objects.filter(status=Order.FINISHED).order_by('-created_date')
    serializer_class = OrderSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('customer_phone',)
    http_method_names = ['get']

    def filter_queryset(self, queryset):
        query = super(TopOrderList, self).filter_queryset(queryset)
        return query[:10]


class SetOrderDeliverStatusView(AtomicMixin, viewsets.ModelViewSet):
    permission_classes = ((permissions.IsAuthenticated),)
    queryset = Order.objects.all()
    http_method_names = ['put']
    serializer_class = SetOrderDeliverStatusSerializer
