import os, sys
import cups

def print_pdf(filepath):
	try: 
		if sys.platform == "win32":
			os.startfile(filename, "print")
		else:
			conn=cups.Connection()
			conn.printFile('Epson-TM-BA-Thermal', filepath, 'Pepperoni', {})
		return True
	except OSError as e:
		return True