
import os, sys  
#from win32 import win32api
#http://stackoverflow.com/questions/12723818/print-to-standard-printer-from-python
def print_pdf(path):      
    try:
        os.startfile(path, "print")
        return True
    except OSError:
        return False
    # CURRENT_DIRECTORY = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    # GHOSTSCRIPT_PATH =  os.path.join(CURRENT_DIRECTORY, r"libs\GHOSTSCRIPT\bin\gswin32.exe")
    # GSPRINT_PATH =  os.path.join(CURRENT_DIRECTORY,r"libs\GSPRINT\gsprint.exe")
    # pdf_directory = os.path.join(CURRENT_DIRECTORY, path )

    # currentprinter = "Microsoft Print To PDF"
    
    # win32api.ShellExecute(
    # 	0, 
    # 	'open', 
    # 	GSPRINT_PATH, 
    # 	'-ghostscript "'+GHOSTSCRIPT_PATH+'" -printer "'+currentprinter+'" "'+pdf_directory+'"',
    # 	 '.',
    # 	  0)
    



