#!/bin/bash
echo "Getting changes" && git pull && \
echo "migration" && python manage.py migrate && \
echo "restart server" && sudo service apache2 restart 