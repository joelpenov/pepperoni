import os, sys
#import cups
#import tempfile
#import win32api
#import win32print


def print_pdf(filepath):
	print(filepath)
	#filepath = filepath.replace( r'\\', r'\\\\' )
	#os.startfile(filepath, "print")
	#if sys.platform == "win32":
	#	os.startfile(filepath, "print")
	#else:
	#	conn = cups.Connection()
	#	conn.printFile('Epson-TM-BA-Thermal', filepath, 'Pepperoni', {})
	#win32print.GetDefaultPrinter()
	#win32api.ShellExecute(0,"print", filepath, '"%s"' % r"http://DESKTOP-0H0DJC5/StarTSP700", ".", 0)