#Fuente: https://github.com/simonluijk/django-invoice/tree/a16a10f728d47b70993856bad6929ff4bf23fee6
#documentacion report lab: http://pydoc.net/Python/reportlab/3.1.8/
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.units import cm
import os
import calendar
from datetime import datetime
import time

root_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class PdfGenerator(object):

	def __init__(self):
		self.MARGIN_LEFT = 0
		self.TOP_MARGIN = 0
		self.FONT_SIZE = 8
		self.FONT_NAME = 'Helvetica'        
		
	def draw_line(self, canvas, depth, dashed=False):
		if dashed:	
			canvas.setDash(2,2)
		canvas.line(0 , depth * cm, (self.MARGIN_LEFT + 8) * cm, depth * cm)
		if dashed:
			canvas.setDash()

	def format_as_number(self, number):
		result = "{0:,f}".format(round(number, 2))
		pointIndex = result.index('.') + 3
		return result[:pointIndex]

	def format_as_date(self, date):
		return str(date.strftime("%Y-%m-%d %H:%M:%S"))

	def draw_header(self, canvas):	
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 3)
		canvas.drawString((self.MARGIN_LEFT + 2.7) * cm, self.TOP_MARGIN * cm, 'Crunchy Pizza')
		canvas.drawString((self.MARGIN_LEFT + 3.1) * cm, (self.TOP_MARGIN - 0.5) * cm, "¡Es mejor!")
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		canvas.drawString((self.MARGIN_LEFT + 0.4) * cm, (self.TOP_MARGIN - 0.9) * cm, 'Ctra. Duarte, próximo a Coraasan, Licey, Stgo')
		canvas.drawString((self.MARGIN_LEFT + 2.8) * cm, (self.TOP_MARGIN - 1.3) * cm, '(809) 580-7673')
		self.draw_line(canvas,(self.TOP_MARGIN - 1.4), dashed=False)


	def draw_business_info(self, canvas, invoice):	
		if invoice.status != 'FINISHED':
			canvas.drawString((self.MARGIN_LEFT + 1.5) * cm, (self.TOP_MARGIN + 0.5) * cm, '--FACTURA NO FINALIZADA--')

		if invoice.sales_area:
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
			canvas.drawString(self.MARGIN_LEFT * cm, (self.TOP_MARGIN - 2.5) * cm, 'Mesa: ' + invoice.sales_area.name)
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		if invoice.to_go:
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
			canvas.drawString((self.MARGIN_LEFT + 3) * cm, (self.TOP_MARGIN - 2.5) * cm, '*Para llevar')
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		elif invoice.to_pickup:
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
			canvas.drawString((self.MARGIN_LEFT + 5) * cm, (self.TOP_MARGIN - 2.5) * cm, '*Para recoger')
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		current_top = self.TOP_MARGIN - 3	
		canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, current_top * cm, 'Num. factura: ' + str(invoice.number))
		canvas.drawString((self.MARGIN_LEFT + 3) * cm, current_top * cm, 'Cajero: ' + invoice.cashier_shift.user.username)
		canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, (current_top - 0.3) * cm, self.format_as_date(invoice.created_date))
		canvas.drawString((self.MARGIN_LEFT + 3) * cm, (current_top - 0.3) * cm, u"Impresión: " + self.format_as_date(datetime.now()))
		canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, (current_top - 0.6) * cm, 'Turno Id: ' + str(invoice.cashier_shift.id))

		self.draw_line(canvas,(self.TOP_MARGIN - 4), dashed=True)


	def draw_customer_info(self, canvas, invoice, depth):	

		line_depth = 0.4
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
		if invoice.customer_name:
			canvas.drawString((self.MARGIN_LEFT + 0.3) * cm, depth * cm, u'Cliente: ' + invoice.customer_name)
			depth -= line_depth
		if invoice.customer_address:
			canvas.drawString((self.MARGIN_LEFT + 0.3) * cm, depth * cm, u'Dirección: ')
			depth -= line_depth			
			canvas.drawString((self.MARGIN_LEFT + 0.3) * cm, depth * cm, invoice.customer_address)			
			depth -= line_depth
		if invoice.customer_reference:
			canvas.drawString((self.MARGIN_LEFT + 0.3) * cm, depth * cm, u'Referencia: ')
			depth -= line_depth			
			canvas.drawString((self.MARGIN_LEFT + 0.3) * cm, depth * cm, invoice.customer_reference)
			depth -= line_depth
		if invoice.customer_phone:
			canvas.drawString((self.MARGIN_LEFT + 0.3) * cm, depth * cm, u'Teléfono: '  + invoice.customer_phone)
			depth -= line_depth
		
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE)
		canvas.drawString((self.MARGIN_LEFT + 2) * cm, (depth - 1.5) * cm, '¡Gracias por preferirnos!')



	def draw_invoice_detail(self, canvas, invoice, details):

		depth = self.TOP_MARGIN - 4.5

		quantity_margin = self.MARGIN_LEFT + 0.2
		description_margin = self.MARGIN_LEFT + 1
		

		canvas.drawString((quantity_margin - 0.2) * cm, depth * cm, 'Cant')
		canvas.drawString(description_margin * cm, depth * cm, 'Descripción')
		canvas.drawString((self.MARGIN_LEFT + 5) * cm, depth * cm, 'Prec')
		canvas.drawString((self.MARGIN_LEFT + 6) * cm, depth * cm, 'Monto')

		self.draw_line(canvas, (self.TOP_MARGIN - 4.6), dashed=True)

		detail_depth = self.TOP_MARGIN-5
		for line in details:
			canvas.drawString((quantity_margin - 0.2)* cm, detail_depth * cm, self.format_as_number(line.quantity))
			canvas.drawString(description_margin * cm, detail_depth * cm, line.product.description[:26])
			canvas.drawString((description_margin + 4) * cm, detail_depth * cm, self.format_as_number(line.price))
			canvas.drawString((self.MARGIN_LEFT + 5.9) * cm, detail_depth * cm, self.format_as_number(line.total))
			detail_depth -= 0.5

		detail_depth = detail_depth + 0.3	
		self.draw_line(canvas, detail_depth, dashed=True)

		canvas.drawString((self.MARGIN_LEFT + 4) * cm, (detail_depth - 0.3) * cm, 'Neto: RD$')
		canvas.drawString((self.MARGIN_LEFT + 5.7)* cm, (detail_depth - 0.3) * cm, self.format_as_number(invoice.total))

		detail_depth = detail_depth - 0.4
		canvas.setDash(2,2)
		canvas.line(4 * cm , detail_depth * cm, (self.MARGIN_LEFT + 7) * cm, detail_depth * cm)
		canvas.setDash()


		return detail_depth - 0.6


	def draw_pdf(self, buffer, invoice, details):

		file_name = os.path.join(root_directory,"invoices",str(calendar.timegm(time.gmtime()))+'_'+str(invoice.number)+'_'+'_invoice.pdf')
		DETAIL_COEFFICIENT = 0.5 * len(details)
		self.TOP_MARGIN = 11 + DETAIL_COEFFICIENT
		PAGE_HEIGHT = 12 + DETAIL_COEFFICIENT

		canvas = Canvas(file_name, pagesize=(8 * cm, PAGE_HEIGHT * cm))
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		canvas.saveState()
		self.draw_header(canvas)
		canvas.restoreState()    

		canvas.saveState()
		self.draw_business_info(canvas, invoice)
		canvas.restoreState()

		canvas.saveState()
		current_depth = self.draw_invoice_detail(canvas, invoice, details)
		canvas.restoreState()

		canvas.saveState()
		self.draw_customer_info(canvas, invoice, current_depth)
		canvas.restoreState()

		textobject = canvas.beginText(self.MARGIN_LEFT * cm, -2.5 * cm)


		canvas.translate(0, 29.7 * cm)	
		canvas.showPage()
		canvas.save()

		return file_name