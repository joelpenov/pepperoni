from datetime import datetime
from dateutil import tz

class DataFormatter(object):
	

	def __init__(self):
		self.to_zone = tz.tzlocal()


	def format_as_number(self, number):
		result = "{0:,f}".format(round(number, 2))
		pointIndex = result.index('.') + 3
		return result[:pointIndex]

	def format_as_date_from_utc(self, date):		
		local_time = date.astimezone(self.to_zone)
		return str(local_time.date()) + ' ' + self.format_hour(str(local_time.time())).lower()
	
	def format_as_date(self, date):
		return date.strftime("%d-%m-%Y ") + " " + self.format_hour(str(date.time())[:8]).lower()

		

	def format_hour(self, string_hour):	  
		ampm = string_hour.split (":")
		if (len(ampm) == 0) or (len(ampm) > 3):
			return string_hour

		hour = int(ampm[0]) % 24
		isam = (hour >= 0) and (hour < 12)
	 
		if isam:
			ampm[0] = ('12' if (hour == 0) else "%02d" % (hour))
		else:
			ampm[0] = ('12' if (hour == 12) else "%02d" % (hour-12))

		return ':'.join (ampm) + (' AM' if isam else ' PM')

