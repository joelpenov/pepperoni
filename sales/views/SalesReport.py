#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.http import HttpResponse
from main.tools.ReportTools import product_ids_are_valid, sql_select, is_valid_date
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
def sales_report(request):
    return render(request, "sales/salesReport.html")


@login_required()
@permission_required('add_warehouse')
def sales_report_service(request):
    request_product_ids = request.GET.getlist("Products")
    start_date = request.GET.get('StartDate', None)
    end_date = request.GET.get('EndDate', None)

    a_month_ago = 30
    last_month_date = date.today() - timedelta(days=a_month_ago)

    start_date = start_date if (start_date and is_valid_date(start_date)) else last_month_date
    end_date = end_date if (end_date and is_valid_date(end_date)) else date.today()

    query = """
            select p.description product,
            sum(od.quantity) quantity,
            od.price,
            sum(od.total) sales,
            ((sum(od.quantity) * od.price) - sum(od.total)) difference
            from sales_orderdetail od
            inner join sales_order o on o.id = od.order_id
            inner join inventory_product p on p.id = od.product_id
            where o.created_date
            between '%s' and '%s' %s
            group by od.price
            order by o.created_date desc, p.description
        """

    valid_list = product_ids_are_valid(request_product_ids)
    filter_by_these_products = (" and p.id in (" + ','.join(request_product_ids) + ") ") if valid_list else ""

    query = query % (start_date, end_date, filter_by_these_products)

    results = sql_select(query)

    return HttpResponse(json.dumps(results, ensure_ascii=False), content_type='application/json; encoding=utf-8')


@login_required()
@permission_required('add_warehouse')
def shifts_report_service(request):
    request_product_ids = request.GET.getlist("Products")
    request_user_ids = request.GET.getlist("Users")

    start_date = request.GET.get('StartDate', None)
    end_date = request.GET.get('EndDate', None)

    a_month_ago = 30
    last_month_date = date.today() - timedelta(days=a_month_ago)

    start_date = start_date if (start_date and is_valid_date(start_date)) else last_month_date
    end_date = end_date if (end_date and is_valid_date(end_date)) else date.today()

    query = """
            select
            p.description product,
            sum(od.quantity) quantity,
            od.price,
            sum(od.total) sales,
            ((sum(od.quantity) * od.price) - sum(od.total)) difference
            from sales_orderdetail od
            inner join sales_order o on o.id = od.order_id
            inner join sales_cashiershift cs on cs.id = o.cashier_shift_id
            inner join	inventory_product p on p.id = od.product_id
            where cs.start_date between '%s' and '%s'
            %s
            %s
            group by od.price
            order by o.created_date desc, p.description;
        """
    valid_products_list = product_ids_are_valid(request_product_ids)
    filter_by_these_products = (" and p.id in (" + ','.join(request_product_ids) + ") ") if valid_products_list else ""

    valid_users_list = product_ids_are_valid(request_user_ids)
    filter_by_these_users = (" and cs.user_id in (" + ','.join(request_user_ids) + ") ") if valid_users_list else ""

    query = query % (start_date, end_date, filter_by_these_products, filter_by_these_users)

    print("\n\n\n QUERY: " + query + "\n\n")
    print("\n\n\n userIDS: " + filter_by_these_users + "\n\n")
    print("\n\n\n Products id: " + filter_by_these_products + "\n\n")
    results = sql_select(query)

    return HttpResponse(json.dumps(results, ensure_ascii=False), content_type='application/json; encoding=utf-8')


