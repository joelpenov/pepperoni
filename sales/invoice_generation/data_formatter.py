


class DataFormatter(object):
	
	def format_as_number(self, number):
		result = "{0:,f}".format(round(number, 2))
		pointIndex = result.index('.') + 3
		return result[:pointIndex]

	def format_as_date(self, date):
		return str(date.strftime("%d-%m-%Y %H:%M:%S"))