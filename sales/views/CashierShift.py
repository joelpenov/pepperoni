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
from sales.models.CashierShift import CashierShiftMoneyDetail

@login_required()
@permission_required('add_warehouse')
def cashiershifts(request):
    return render(request, "sales/cashierShift.html")

@login_required
def finish_shift_money_detail(request):
    cashier_shift_id = request.GET.get('cashiershiftid', None)
    
    wrong_request = {'success_printing': False}

    if not cashier_shift_id or not cashier_shift_id.isdigit():
        return JsonResponse(wrong_request)

    cashier_shift_id = int(cashier_shift_id)

    cashier_shilf_money_details = CashierShiftMoneyDetail.objects.filter(cashier_shift_id=cashier_shift_id).order_by('value')

    if len(cashier_shilf_money_details) == 0:
        return JsonResponse(wrong_request)

    pdfgenerator = PdfGenerator()

    pdfgenerator.draw_cashier_shift_money_detail(cashier_shilf_money_details)

    return JsonResponse({'success_printing': True})


@login_required
def print_shift_stock(request):
    cash_register_id = request.GET.get('cashregisterid', None)

    if not cash_register_id or not cash_register_id.isdigit():
        return JsonResponse({'success_printing': False})

    cash_register_id = int(cash_register_id)
    pdfgenerator = PdfGenerator()

    warehouse_id = CashRegister.objects.get(pk=cash_register_id).warehouse.id
    details = Stock.objects.filter(warehouse__id=warehouse_id, product__print_on_cashier_shift=True)

    pdfgenerator.draw_cashier_shift_stock_report(details)

    return JsonResponse({'success_printing': True})

@login_required
def print_finish_shift_money_detail(request):
    cash_register_id = request.GET.get('cashregisterid', None)


class CashierShiftList(AtomicMixin, viewsets.ModelViewSet):
    permission_classes = ((permissions.IsAuthenticated),)
    queryset = CashierShift.objects.all()
    serializer_class = CashierShiftSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('user', 'status',)