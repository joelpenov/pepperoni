#!/bin/bash
git pull && \
python manage.py migrate && \
sudo service apache2 restart 