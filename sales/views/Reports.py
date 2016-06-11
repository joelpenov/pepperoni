from django.contrib.auth.decorators import permission_required
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required()
@permission_required('add_warehouse')
def sales_report(request):
    return render(request,"sales/salesReport.html")




# class SalesReporttList(AtomicMixin, viewsets.ModelViewSet):
#     permission_classes =((permissions.IsAuthenticated),)
#     queryset = CashierShift.objects.all()
#     serializer_class = CashierShiftSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('user','status',)