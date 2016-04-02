import os, sys
#import cups

def print_pdf(filepath):
	try:
		print('Plataform blah')
		print( sys.platform=='win32')
		if sys.platform == 'win32':
			print('printed')
			os.startfile(filepath, "print")
		else:
			conn=
			conn=cups.Connection()
			conn.printFile('Epson-TM-BA-Thermal', filepath, 'Pepperoni', {})
		return True
	except OSError as e:
		print(e)
		return True