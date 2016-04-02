import os, sys
#import cups

def print_pdf(filepath):	 
	if sys.platform == "win32":
		os.startfile(filename, "print")
	else:
		conn=cups.Connection()
		conn.printFile('Epson-TM-BA-Thermal', filepath, 'Pepperoni', {})