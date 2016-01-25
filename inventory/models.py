from django.db import models

class Warehouse(models.Model):
	name = models.CharField(max_length=50)

	def __str__(self):
		return self.name

class Product(models.Model):
	description = models.CharField(max_length=255)
	sell_price = models.FloatField(default=0)
	show_in_menu= models.BooleanField()
	is_raw_material= models.BooleanField()

	def __str__(self):
		return

class Stock(models.Model):
	product = models.ForeignKey(Product, related_name="product_stock")
	warehouse = models.ForeignKey(Warehouse, related_name="warehouse_stock")
	quantity = models.FloatField()


class InventoryMove(models.Model):
	INPUT = 'INPUT'
	OUTPUT = 'OUTPUT'
	TRANSFER = 'TRANSFER'
	MOVE_TYPE_CHOICES = (
		(INPUT, 'Entrada'),
		(OUTPUT, 'Salida'),
		(TRANSFER, 'Transferencia'),
	)

	warehouse = models.ForeignKey(Warehouse, related_name="inventory_moves")
	transaction_type = models.CharField(max_length=20, choices=MOVE_TYPE_CHOICES)
	transaction_date = models.DateField()
	#transaction_id = models.UUIDField()


class InventoryMoveDetail(models.Model):
	inventory_move = models.ForeignKey(InventoryMove, related_name="details")
	product = models.ForeignKey(Product, related_name="inventory_move_details")
	quantity = models.FloatField()
	price = models.FloatField()
	total = models.FloatField()

#attempt to update the stock, not working need to rethink this
	# def updateStock(self):
	# 	move =self.inventory_move;
	# 	stock = Stock.objects.filter(product_id=self.product_id).filter(warehouse_id=move.warehouse_id).first()
	# 	if(stock==None):
	# 		stock = Stock.objects.create(product_id=self.product_id, warehouse_id  = move.warehouse_id, quantity = 0)
    #
	# 	if(move.transaction_type==InventoryMove.INPUT):
	# 		stock.quantity = stock.quantity + self.quantity
	# 	else:
	# 		stock.quantity = stock.quantity - self.quantity
    #
	# 	stock.save()
    #
    #
	# def save(self, *args, **kwargs):
	# 	super(InventoryMoveDetail, self).save(*args, **kwargs)
	# 	self.updateStock()
    #
	# def delete(self, *args, **kwargs):
	# 	super(InventoryMoveDetail, self).delete(*args, **kwargs)
    #
	# 	move =self.inventory_move;
	# 	stock = Stock.objects.filter(product_id=self.product_id).filter(warehouse_id=move.warehouse_id).first()
	# 	if(stock==None):
	# 		stock = Stock.objects.create(product_id=self.product_id, warehouse_id  = move.warehouse_id, quantity = 0)
    #
	# 	if(move.transaction_type==InventoryMove.OUTPUT):
	# 		stock.quantity = stock.quantity + self.quantity
	# 	else:
	# 		stock.quantity = stock.quantity - self.quantity
    #
	# 	stock.save()


