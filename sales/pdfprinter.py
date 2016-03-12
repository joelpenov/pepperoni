
import os, sys, subprocess

def print_pdf(filename):
    if sys.platform == "win32":
        os.startfile(filename, "print")
    else:
        opener ="open" if sys.platform == "darwin" else "xdg-open"
        subprocess.call([opener, filename], "print")




