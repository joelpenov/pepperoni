from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.units import cm
import os
import calendar
from datetime import datetime
import time
from functools import partial

from sales.invoice_generation.smart_text_cut import SmartCutter
from sales.invoice_generation.data_formatter import DataFormatter

root_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class PdfGenerator(object):
    def __init__(self):
        self.MARGIN_LEFT = 0
        self.TOP_MARGIN = 0
        self.FONT_SIZE = 8
        self.FONT_NAME = 'Helvetica'
        self.text_cutter = SmartCutter()
        self.formatter = DataFormatter()


    def draw_line(self, canvas, depth, dashed=False):
        if dashed:
            canvas.setDash(2, 2)
        canvas.line(0, depth * cm, (self.MARGIN_LEFT + 8) * cm, depth * cm)
        if dashed:
            canvas.setDash()


    def draw_header(self, canvas):
        canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 3)
        canvas.drawString((self.MARGIN_LEFT + 2.7) * cm, self.TOP_MARGIN * cm, 'Crunchy Pizza')
        canvas.drawString((self.MARGIN_LEFT + 3.1) * cm, (self.TOP_MARGIN - 0.5) * cm, "¡Es mejor!")
        canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

        canvas.drawString((self.MARGIN_LEFT + 0.9) * cm, (self.TOP_MARGIN - 0.9) * cm,
                          'Ctra. Duarte, próximo a Coraasan, Licey, Stgo')
        canvas.drawString((self.MARGIN_LEFT + 2.8) * cm, (self.TOP_MARGIN - 1.3) * cm, '(809) 580-7673')
        self.draw_line(canvas, (self.TOP_MARGIN - 1.4), dashed=False)


    def print_label(self, canvas, message):
        canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
        canvas.drawString((self.MARGIN_LEFT + 4) * cm, (self.TOP_MARGIN - 2.5) * cm, '*' + message)
        canvas.setFont(self.FONT_NAME, self.FONT_SIZE)


    def draw_business_info(self, canvas, invoice):
        if invoice.status != 'FINISHED':
            canvas.drawString((self.MARGIN_LEFT + 2.2) * cm, (self.TOP_MARGIN + 0.5) * cm, '--NO ES UNA FACTURA--')

        if invoice.sales_area:
            canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
            canvas.drawString(self.MARGIN_LEFT * cm, (self.TOP_MARGIN - 2.5) * cm, 'Mesa: ' + invoice.sales_area.name)
            canvas.setFont(self.FONT_NAME, self.FONT_SIZE)

        if invoice.to_go:
            self.print_label(canvas, "PARA LLEVAR")

        elif invoice.to_pickup:
            self.print_label(canvas, "PARA RECOGER")

        else:
            self.print_label(canvas, "PARA COMER AQUI")

        current_top = self.TOP_MARGIN - 3
        canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, current_top * cm, 'Num. factura: ' + str(invoice.number))
        canvas.drawString((self.MARGIN_LEFT + 3.5) * cm, current_top * cm,
                          'Cajero: ' + invoice.cashier_shift.user.username)
        canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, (current_top - 0.3) * cm,
                          self.formatter.format_as_date_from_utc(invoice.created_date))
        canvas.drawString((self.MARGIN_LEFT + 3.5) * cm, (current_top - 0.3) * cm,
                          "Turno Id: " + str(invoice.cashier_shift.id))
        canvas.drawString((self.MARGIN_LEFT + 0.2) * cm, (current_top - 0.6) * cm,
                          u"Impresión: " + self.formatter.format_as_date(datetime.now()))

        self.draw_line(canvas, (self.TOP_MARGIN - 4), dashed=True)


    def draw_customer_info(self, canvas, invoice, depth):
        line_depth = 0.4
        move_to_right = 0.3
        canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)

        if invoice.customer_name:
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, u'Cliente: ' +
                              invoice.customer_name.capitalize())
            depth -= line_depth
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, "")
            depth -= line_depth

        if invoice.customer_address:
            reference_as_list = self.text_cutter.split_on_space(invoice.customer_address)
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, u'Dirección: ')
            depth -= line_depth
            for line in reference_as_list:
                canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, line)
                depth -= line_depth
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, "")
            depth -= line_depth

        if invoice.customer_reference:
            reference_as_list = self.text_cutter.split_on_space(invoice.customer_reference)
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, u'Referencia: ')
            depth -= line_depth
            for line in reference_as_list:
                canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, line)
                depth -= line_depth
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, "")
            depth -= line_depth

        if invoice.customer_phone:
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm,
                              u'Teléfono: ' + invoice.customer_phone)
            depth -= line_depth
            canvas.drawString((self.MARGIN_LEFT + move_to_right) * cm, depth * cm, "")
            depth -= line_depth

        canvas.setFont(self.FONT_NAME, self.FONT_SIZE)
        canvas.drawString((self.MARGIN_LEFT + 2) * cm, (depth - 0.1) * cm, '¡Gracias por preferirnos!')


    def draw_invoice_detail(self, canvas, invoice, details):

        depth = self.TOP_MARGIN - 4.5

        quantity_margin = self.MARGIN_LEFT + 0.2
        description_margin = self.MARGIN_LEFT + 1

        canvas.drawString((quantity_margin - 0.2) * cm, depth * cm, 'Cant')
        canvas.drawString(description_margin * cm, depth * cm, 'Descripción')
        canvas.drawString((self.MARGIN_LEFT + 5) * cm, depth * cm, 'Prec')
        canvas.drawString((self.MARGIN_LEFT + 6) * cm, depth * cm, 'Monto')

        self.draw_line(canvas, (self.TOP_MARGIN - 4.6), dashed=True)

        detail_depth = self.TOP_MARGIN - 5
        for line in details:
            canvas.drawString((quantity_margin - 0.2) * cm, detail_depth * cm,
                              self.formatter.format_as_number(line.quantity))
            canvas.drawString(description_margin * cm, detail_depth * cm,
                              line.product.description.lower().capitalize()[:26])
            canvas.drawString((description_margin + 4) * cm, detail_depth * cm,
                              self.formatter.format_as_number(line.price))
            canvas.drawString((self.MARGIN_LEFT + 5.9) * cm, detail_depth * cm,
                              self.formatter.format_as_number(line.total))
            detail_depth -= 0.5

        detail_depth += 0.3
        self.draw_line(canvas, detail_depth, dashed=True)

        canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 2)
        canvas.drawString((self.MARGIN_LEFT + 4) * cm, (detail_depth - 0.6) * cm, 'Neto: RD$')
        canvas.drawString((self.MARGIN_LEFT + 5.7) * cm, (detail_depth - 0.6) * cm,
                          self.formatter.format_as_number(invoice.total))

        canvas.drawString((self.MARGIN_LEFT + 3.5) * cm, (detail_depth - 1.2) * cm, 'Recibido: RD$ ')
        canvas.drawString((self.MARGIN_LEFT + 5.9) * cm, (detail_depth - 1.2) * cm,
                          self.formatter.format_as_number(invoice.cash))

        canvas.drawString((self.MARGIN_LEFT + 3.5) * cm, (detail_depth - 1.8) * cm, 'Devuelto: RD$ ')
        canvas.drawString((self.MARGIN_LEFT + 5.9) * cm, (detail_depth - 1.8) * cm,
                          self.formatter.format_as_number(invoice.customer_change))

        self.draw_line(canvas, (detail_depth - 2), dashed=False)

        return detail_depth - 3


    def get_document_height(self, invoice, details):
        detail_coefficient = 0.5 * len(details)
        customer_lines = len(
            self.text_cutter.split_on_space(invoice.customer_address) + self.text_cutter.split_on_space(
                invoice.customer_reference))
        return 12 + detail_coefficient + (0.5 * customer_lines)


    def add_water_mark(self, canvas, message):
        canvas.setFont(self.FONT_NAME, self.FONT_SIZE + 45)
        canvas.setFillGray(0.5, 0.5)
        canvas.translate(240, 120)
        canvas.rotate(50)
        canvas.drawCentredString(0, 150, message)

    def build_canvas(self, file_name, PAGE_HEIGHT):
        canvas = Canvas(file_name, pagesize=(8 * cm, PAGE_HEIGHT * cm))
        canvas.setFont(self.FONT_NAME, self.FONT_SIZE)
        canvas.setTitle("Pepperonni System - " + str(calendar.timegm(time.gmtime())))
        return canvas


    def perform_canvas_step(self, action, canvas):
        canvas.saveState()
        return_value = action()
        canvas.restoreState()

        return return_value

    def draw_invoice_pdf(self, invoice, details):

        file_name = os.path.join(root_directory, "..", "invoices",
                                 str(calendar.timegm(time.gmtime())) + '_invoice.pdf')

        PAGE_HEIGHT = self.get_document_height(invoice, details)
        self.TOP_MARGIN = PAGE_HEIGHT - 1

        canvas = self.build_canvas(file_name, PAGE_HEIGHT)

        if invoice.printed:
            self.perform_canvas_step(partial(self.add_water_mark, canvas, "NO HACER"), canvas)

        self.perform_canvas_step(partial(self.draw_header, canvas), canvas)
        self.perform_canvas_step(partial(self.draw_business_info, canvas, invoice), canvas)
        current_depth = self.perform_canvas_step(partial(self.draw_invoice_detail, canvas, invoice, details), canvas)
        self.perform_canvas_step(partial(self.draw_customer_info, canvas, invoice, current_depth), canvas)

        canvas.translate(0, 29.7 * cm)
        canvas.showPage()
        canvas.save()

        return file_name


    def draw_stock_detail(self, canvas, details):

        if len(details) == 0:
            canvas.drawString((self.MARGIN_LEFT + 2.2) * cm, (self.TOP_MARGIN + 0.5) * cm,
                              "No hay productos para mostrar")
            return

        canvas.drawString((self.MARGIN_LEFT + 2.2) * cm, (self.TOP_MARGIN - 2) * cm,
                          "Reporte de '" + details[0].warehouse.name + "'")

        depth = self.TOP_MARGIN - 2.5
        quantity_margin = self.MARGIN_LEFT + 0.2

        canvas.drawString((quantity_margin - 0.2) * cm, depth * cm, 'Producto')
        canvas.drawString((self.MARGIN_LEFT + 6) * cm, depth * cm, 'Cantidad')

        self.draw_line(canvas, (self.TOP_MARGIN - 4.6), dashed=True)

        detail_depth = self.TOP_MARGIN - 3
        for line in details:
            canvas.drawString(quantity_margin * cm, detail_depth * cm, line.product.description)
            canvas.drawString((quantity_margin + 6) * cm, detail_depth * cm, str(line.quantity))
            detail_depth -= 0.4

        detail_depth += 0.3

        return detail_depth - 3

    def draw_cashier_shift_stock_report(self, details):
        file_name = os.path.join(root_directory, '..', "invoices",
                                 str(calendar.timegm(time.gmtime())) + '_' + '_cashiershifts.pdf')

        page_height = (len(details) * 0.5) + 5
        self.TOP_MARGIN = page_height - 1

        canvas = self.build_canvas(file_name, page_height)

        self.perform_canvas_step(partial(self.draw_header, canvas), canvas)

        self.draw_stock_detail(canvas, details)

        canvas.translate(0, 29.7 * cm)
        canvas.showPage()
        canvas.save()

        return file_name




