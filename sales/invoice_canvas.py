#Fuente: https://github.com/simonluijk/django-invoice/tree/a16a10f728d47b70993856bad6929ff4bf23fee6
#documentacion report lab: http://pydoc.net/Python/reportlab/3.1.8/
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.units import cm
import os
import calendar
from datetime import date
import time

root_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class PdfGenerator(object):

	def __init__(self):
		self.MARGIN_LEFT = 0.1
		self.TOP_MARGIN = 0
		self.FONT_SIZE = 10
		self.FONT_NAME = 'Helvetica'        
		

	def draw_header(self, canvas):	
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
		canvas.drawString((self.MARGIN_LEFT + 2.7) * cm, self.TOP_MARGIN * cm, 'Crunchy Pizza')
		canvas.drawString((self.MARGIN_LEFT + 3) * cm, (self.TOP_MARGIN - 0.5) * cm, "¡Es mejor!")
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, (self.TOP_MARGIN - 0.9) * cm, 'Ctra. Duarte, próximo a Coraasan, Licey, Stgo')
		canvas.drawString((self.MARGIN_LEFT + 2.5) * cm, (self.TOP_MARGIN - 1.3) * cm, '(809) 580-7673')
		canvas.line(0 , (self.TOP_MARGIN - 1.5) * cm, (self.MARGIN_LEFT + 8) * cm, (self.TOP_MARGIN - 1.5) * cm)


	def draw_business_info(self, canvas, invoice):	

		if invoice.sales_area:
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
			canvas.drawString((self.MARGIN_LEFT + 1) * cm, (self.TOP_MARGIN - 2.5) * cm, 'Mesa: ' + invoice.sales_area.name)
			canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		current_top = self.TOP_MARGIN - 3	
		canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, current_top * cm, 'Factura: ' + str(invoice.number))
		canvas.drawString((self.MARGIN_LEFT + 3) * cm, current_top * cm, 'Cajero: ' + invoice.cashier_shift.user.username)
		canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, (current_top - 0.5) * cm, str(invoice.created_date.strftime("%Y-%m-%d %H:%M:%S")))		
		canvas.line(0 , (self.TOP_MARGIN - 4) * cm, (self.MARGIN_LEFT + 8) * cm, (self.TOP_MARGIN - 4) * cm)


	def draw_customer_info(self, canvas, invoice, depth):

		business_details = (        
			u'Cliente: ' + invoice.customer_name,
			u'Teléfono: '  + invoice.customer_phone,
			u'Dirección: '  + invoice.customer_address,
			u'Referencia: '  + invoice.customer_reference,
		)
		canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
		textobject = canvas.beginText((self.MARGIN_LEFT + 0.3) * cm, (depth - 1) * cm)
		for line in business_details:
			textobject.textLine(line)
		canvas.drawText(textobject)

		canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

		canvas.drawString((self.MARGIN_LEFT + 2) * cm, (depth - 4) * cm, '¡Gracias por preferirnos!')



	def draw_invoice_detail(self, canvas, invoice, details):

		depth = self.TOP_MARGIN - 4.5

		quantity_margin = self.MARGIN_LEFT + 0.2
		description_margin = self.MARGIN_LEFT + 1
		

		canvas.drawString((quantity_margin - 0.2) * cm, depth * cm, 'Cant')
		canvas.drawString(description_margin * cm, depth * cm, 'Descripción')
		canvas.drawString((self.MARGIN_LEFT + 6) * cm, depth * cm, 'Monto')
		canvas.line(0 , (self.TOP_MARGIN - 4.6) * cm, (self.MARGIN_LEFT + 8) * cm, (self.TOP_MARGIN - 4.6) * cm)

		detail_depth = self.TOP_MARGIN-5
		for line in details:
			canvas.drawString(quantity_margin * cm, detail_depth * cm, str(line.quantity))
			canvas.drawString(description_margin * cm, detail_depth * cm, str(line.product.description)[:26])
			canvas.drawString((self.MARGIN_LEFT + 6) * cm, detail_depth * cm, str(line.total))
			detail_depth -= 0.5

		canvas.line(0 , (detail_depth + 0.3) * cm, (self.MARGIN_LEFT + 8) * cm, (detail_depth + 0.3) * cm)

		canvas.drawString((self.MARGIN_LEFT + 5) * cm, (detail_depth - 0.2) * cm, 'Neto: ')
		canvas.drawString((self.MARGIN_LEFT + 6)* cm, (detail_depth - 0.2) * cm, str(invoice.total))

		detail_depth = detail_depth - 0.3

		canvas.line(5 * cm, detail_depth * cm, (self.MARGIN_LEFT + 7) * cm, detail_depth * cm)

		return detail_depth - 0.5


		# for line in details:
		#     headers_details = (        
		#         u'Cant Descripción: '  + invoice['contact_phone'],
		#         u'Monto: '  + invoice['address'],
		#         u'Subtotal: '  + invoice['reference'],
		#     )
		#     textobject = canvas.beginText(self.MARGIN_LEFT * cm, -4 * cm)
		#     for line in business_details:
		#         textobject.textLine(line)
		#     canvas.drawText(textobject)



	# def draw_footer(canvas):
	#     note = (
	#         u'Crunchy Pizza, Santiago, República Dominicana',
	#         (u'Todos los derechos reservados ' + str(date.today().year) + '.')
	#     )
	#     textobject = canvas.beginText((self.MARGIN_LEFT) * cm, -27 * cm)
	#     for line in note:
	#         textobject.textLine(line)
	#     canvas.drawText(textobject)


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

		# pdf = buffer.getvalue()
		# buffer.close()

		return file_name

	#COPY
