from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from sales.models.Order import Order
from sales.serializers.Order import OrderSerializer
from main.mixin import AtomicMixin

from io import BytesIO
from sales.invoice_canvas import draw_pdf
from sales.pdfprinter import print_pdf
from django.http import JsonResponse

FAKE_INVOICE = {'contact_name':'Joel Pena', 
        'address': 'Carretera Duarte, Km 9.5', 
        'contact_phone': '809-736-0987', 
        'reference':'Entrada del nueve',
        'invoice_number':'AS0834M49',
        'invoice_date':'23/02/2016',
        'invoice_hour': '10:43 PM',
        'invoice_area': '#1',
        'username':'jpena',
        'details': [{'quantity': 2, 'description': 'Pizza Grande de Peperoni', 'amount': 400.00},
                    {'quantity': 1, 'description': 'Refresco 20 oz', 'amount': 20.00}],
        'total': 420.00,

        }

@login_required()
def pointOfSales(request):
    return render(request,"sales/pointOfSales.html")

def print_invoice(request):
    file_buffer = BytesIO()
    file_path = draw_pdf(file_buffer, FAKE_INVOICE)
    #success_printing = print_pdf(file_path)
    return JsonResponse({'status': True})


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