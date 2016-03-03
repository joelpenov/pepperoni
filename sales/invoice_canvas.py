#Fuente: https://github.com/simonluijk/django-invoice/tree/a16a10f728d47b70993856bad6929ff4bf23fee6
#documentacion report lab: http://pydoc.net/Python/reportlab/3.1.8/
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Table
from reportlab.lib.pagesizes import B2, ELEVENSEVENTEEN, A4, B1, B3, B4, B5, A1
from reportlab.lib.units import cm
import os
import calendar
from datetime import date
import time

root_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MARGIN_LEFT = 0.1
TOP_MARGIN = 13
FONT_SIZE = 10

def draw_header(canvas):
	canvas.setFont('Helvetica', FONT_SIZE)
	canvas.drawString((MARGIN_LEFT + 2.7) * cm, TOP_MARGIN * cm, 'Crunchy Pizza')
	canvas.drawString((MARGIN_LEFT + 3) * cm, (TOP_MARGIN - 0.5) * cm, "¡Es mejor!")
	canvas.drawString((MARGIN_LEFT + 0.2) * cm, (TOP_MARGIN - 0.9) * cm, 'Ctra. Duarte, próximo a Coraasan, Licey, Stgo')
	canvas.drawString((MARGIN_LEFT + 3) * cm, (TOP_MARGIN - 1.3) * cm, '(809) 580-7673')
	canvas.line(0 , (TOP_MARGIN - 1.5) * cm, (MARGIN_LEFT + 8) * cm, (TOP_MARGIN - 1.5) * cm)


def draw_business_info(canvas, invoice):	

	if 'invoice_area' in invoice and invoice['invoice_area']:
		canvas.setFont('Helvetica', FONT_SIZE + 4)
		canvas.drawString((MARGIN_LEFT + 3) * cm, (TOP_MARGIN - 2.5) * cm, 'Mesa: ' + invoice['invoice_area'])
		canvas.setFont('Helvetica', FONT_SIZE)

	current_top = TOP_MARGIN - 3	
	canvas.drawString((MARGIN_LEFT + 0.2) * cm, current_top * cm, 'Factura: ' + invoice['invoice_number'])
	canvas.drawString((MARGIN_LEFT + 4) * cm, current_top * cm, 'Cajero: ' + invoice['username'])
	canvas.drawString((MARGIN_LEFT + 0.2) * cm, (current_top - 0.5) * cm, invoice['invoice_date'] + ' ' + invoice['invoice_hour'])
	canvas.drawString((MARGIN_LEFT + 4) * cm, (current_top - 0.5) * cm, invoice['contact_name'])
	canvas.line(0 , (TOP_MARGIN - 4) * cm, (MARGIN_LEFT + 8) * cm, (TOP_MARGIN - 4) * cm)


def draw_customer_info(canvas, invoice):
	business_details = (        
		u'Cliente: ' + invoice['contact_name'],
		u'Teléfono: '  + invoice['contact_phone'],
		u'Dirección: '  + invoice['address'],
		u'Referencia: '  + invoice['reference'],
	)
	canvas.setFont('Helvetica', 18)
	textobject = canvas.beginText(MARGIN_LEFT * cm, -4 * cm)
	for line in business_details:
		textobject.textLine(line)
	canvas.drawText(textobject)


def draw_invoice_detail(canvas, invoice):
	details = invoice['details']
	depth = TOP_MARGIN - 4.5

	quantity_margin = MARGIN_LEFT + 0.2
	description_margin = MARGIN_LEFT + 1
	

	canvas.drawString((quantity_margin - 0.2) * cm, depth * cm, 'Cant')
	canvas.drawString(description_margin * cm, depth * cm, 'Descripción')
	canvas.drawString((MARGIN_LEFT + 6) * cm, depth * cm, 'Monto')
	canvas.line(0 , (TOP_MARGIN - 4.6) * cm, (MARGIN_LEFT + 8) * cm, (TOP_MARGIN - 4.6) * cm)

	detail_depth = TOP_MARGIN-5
	for line in details:
		canvas.drawString(quantity_margin * cm, detail_depth * cm, str(line['quantity']))
		canvas.drawString(description_margin * cm, detail_depth * cm, str(line['description'])[:24])
		canvas.drawString((MARGIN_LEFT + 6) * cm, detail_depth * cm, str(line['amount']))
		detail_depth -= 0.5

	canvas.line(0 , (detail_depth + 0.3) * cm, (MARGIN_LEFT + 8) * cm, (detail_depth + 0.3) * cm)

	canvas.drawString((MARGIN_LEFT + 5) * cm, (detail_depth - 0.2) * cm, 'Neto: ')
	canvas.drawString((MARGIN_LEFT + 6)* cm, (detail_depth - 0.2) * cm, str(invoice['total']))

	canvas.line(5 * cm, (detail_depth - 0.3) * cm, (MARGIN_LEFT + 7) * cm, (detail_depth - 0.3) * cm)


	# for line in details:
	#     headers_details = (        
	#         u'Cant Descripción: '  + invoice['contact_phone'],
	#         u'Monto: '  + invoice['address'],
	#         u'Subtotal: '  + invoice['reference'],
	#     )
	#     textobject = canvas.beginText(MARGIN_LEFT * cm, -4 * cm)
	#     for line in business_details:
	#         textobject.textLine(line)
	#     canvas.drawText(textobject)



# def draw_footer(canvas):
#     note = (
#         u'Crunchy Pizza, Santiago, República Dominicana',
#         (u'Todos los derechos reservados ' + str(date.today().year) + '.')
#     )
#     textobject = canvas.beginText((MARGIN_LEFT) * cm, -27 * cm)
#     for line in note:
#         textobject.textLine(line)
#     canvas.drawText(textobject)


def draw_pdf(buffer, invoice):
	file_name = root_directory+u'\invoices\\'+str(calendar.timegm(time.gmtime()))+'_factura.pdf'
	canvas = Canvas(file_name, pagesize=(8 * cm, 15 * cm))
	canvas.setFont('Helvetica', FONT_SIZE)

	canvas.saveState()
	draw_header(canvas)
	canvas.restoreState()    

	canvas.saveState()
	draw_business_info(canvas, invoice)
	canvas.restoreState()

	canvas.saveState()
	draw_customer_info(canvas, invoice)
	canvas.restoreState()

	canvas.saveState()
	draw_invoice_detail(canvas, invoice)
	canvas.restoreState()

	textobject = canvas.beginText(MARGIN_LEFT * cm, -2.5 * cm)


	canvas.translate(0, 29.7 * cm)	
	canvas.showPage()
	canvas.save()

	# pdf = buffer.getvalue()
	# buffer.close()

	return file_name

#COPY
