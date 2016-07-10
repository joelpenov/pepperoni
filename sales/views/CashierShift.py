from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import permission_required
from rest_framework import viewsets, permissions, filters
from sales.models.CashierShift import CashierShift
from sales.models.CashRegister import CashRegister
from inventory.models.Stock import Stock
from sales.serializers.CashierShift import CashierShiftSerializer
from main.mixin import AtomicMixin
from django.http import JsonResponse
from sales.invoice_generation.invoice_canvas import PdfGenerator
from sales.invoice_generation.pdfprinter import print_pdf


@login_required()
@permission_required('add_warehouse')
def cashiershifts(request):
    return render(request,"sales/cashierShift.html")


@login_required
def print_shift_stock(request):
    cash_register_id = request.GET.get('cashregisterid', None)

    if not cash_register_id and not cash_register_id.isdigit():
        return JsonResponse({'success_printing': False})

    cash_register_id = int(cash_register_id)
    pdfgenerator = PdfGenerator()

    warehouse_id=CashRegister.objects.get(pk=cash_register_id).warehouse.id
    details =Stock.objects.filter(warehouse__id=warehouse_id, product__print_on_cashier_shift=True)

    file_path = pdfgenerator.draw_cashier_shift_stock_report(details)
    
    print_pdf(file_path)

    return JsonResponse({'success_printing': True})


class CashierShiftList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes =((permissions.IsAuthenticated),)
    queryset = CashierShift.objects.all()
    serializer_class = CashierShiftSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('user','status',)