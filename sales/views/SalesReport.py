#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.http import HttpResponse
from rest_framework import permissions, filters
from sales.models.Order import Order, OrderDetail
from main.mixin import AtomicMixin
from rest_framework import viewsets, permissions, filters
from datetime import datetime, date, timedelta

from django.contrib.auth.decorators import permission_required
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.db import connection
import json
from django.http import JsonResponse

@login_required()
@permission_required('add_warehouse')
def salesreport(request):
    return render(request,"sales/salesReport.html")

@login_required()
@permission_required('add_warehouse')
def sales_report_service(request):    
    
    id_list = request.GET.getlist("Products")
    start_date = request.GET.get('StartDate', None)
    end_date = request.GET.get('EndDate', None)

    a_month_ago = 30
    last_month_date = date.today() - timedelta(days = a_month_ago)
    
    start_date = start_date if (start_date and is_valid_date(start_date)) else last_month_date
    end_date = end_date if (end_date and is_valid_date(end_date)) else date.today()    

    query = """
            select 
            p.id, p.description product, 
            sum(od.quantity) quantity, 
            p.sell_price price,  
            sum(od.total) sales,
            (sum(od.total) - sum(p.sell_price * od.quantity)) difference
            from sales_orderdetail od  
            inner join sales_order o on o.id = od.order_id  
            inner join inventory_product p on p.id = od.product_id  
            where o.created_date 
            between '%s' and '%s' %s
            group by p.id, p.sell_price 
            order by o.created_date desc, od.total
        """
    
    valid_list = product_ids_are_valid(id_list)
    in_clouse = (" and p.id in ("+ ','.join(id_list) +") ") if valid_list else ""

    query = query % (start_date, end_date, in_clouse)
    results = sql_select(query)
    

    return HttpResponse(json.dumps(results, ensure_ascii=False), content_type='application/json; encoding=utf-8') 
    
def product_ids_are_valid(product_ids):

    if len(product_ids) == 0:
        return False

    product_ids = product_ids[0].split(",")

    for id in product_ids:
        if not id.isdigit() or int(id) < 1:            
            return False            
    return True

def is_valid_date(date_text):
    try:
        if date_text != datetime.strptime(date_text, "%Y-%m-%d").strftime('%Y-%m-%d'):
            raise ValueError
        return True
    except ValueError:
        return False

def sql_select(sql):
    cursor = connection.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()
    list_result = []
    i = 0    
    for row in results:
        dict = {} 
        field = 0
        while True:            
            try:
                dict[cursor.description[field][0]] = results[i][field]                
                field = field +1
            except IndexError as e:
                break
        i = i + 1
        list_result.append(dict) 
    return list_result