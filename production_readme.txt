
virtualenv pepperonienv -p /usr/bin/python3.4 && \
source pepperonienv/bin/activate && \
pip install -r requirements_prod.txt 



sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install pip
sudo apt-get install python-pip
sudo pip install virtualenv
sudo apt-get install build-essential autoconf libtool pkg-config python-opengl python-imaging python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3 python-dev
sudo apt-get install libcups2-dev
pip install setuptools --upgrade
sudo apt-get install libffi-dev
sudo apt-get install python-dev
sudo apt-get install python3-dev


# install libjpeg-dev with apt
sudo apt-get install libjpeg-dev
# if you're on Ubuntu 14.04, also install this
sudo apt-get install libjpeg8-dev

# reinstall pillow
pip install --no-cache-dir -I pillow
