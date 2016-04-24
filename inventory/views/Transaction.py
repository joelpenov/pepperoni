from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, filters
from inventory.models.Transaction import Transaction
from inventory.serializers.Transaction import TransactionSerializer, TransactionTransferSerializer
from main.mixin import AtomicMixin


@login_required()
def inventoryInput(request):
	return render(request,"inventory/InventoryInput.html")

@login_required()
def inventoryOutput(request):
	return render(request,"inventory/InventoryOutput.html")

@login_required()
def inventoryTransfer(request):
	return render(request,"inventory/InventoryTransfer.html")

class InventoryInputList(AtomicMixin, viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Transaction.objects.filter(transaction_type=Transaction.INPUT)
	serializer_class = TransactionSerializer

	def get_serializer_context(self):
		return {'request': self.request, 'transaction_type':Transaction.INPUT}


class InventoryOutputList(AtomicMixin, viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Transaction.objects.filter(transaction_type=Transaction.OUTPUT)
	serializer_class = TransactionSerializer

	def get_serializer_context(self):
		return {'request': self.request, 'transaction_type':Transaction.OUTPUT}


class InventoryTransferList(AtomicMixin, viewsets.ModelViewSet):
	permission_classes =((permissions.IsAuthenticated),)
	queryset = Transaction.objects.filter(transaction_type=Transaction.TRANSFER)
	serializer_class = TransactionTransferSerializer

	def get_serializer_context(self):
		return {'request': self.request, 'transaction_type':Transaction.TRANSFER}
