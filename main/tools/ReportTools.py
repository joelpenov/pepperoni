from datetime import datetime
from django.db import connection


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
                dict[cursor.description[field][0]] = str(results[i][field])
                field = field +1
            except IndexError as e:
                break
        i = i + 1
        list_result.append(dict)
    return list_result


def product_ids_are_valid(product_ids):

    if len(product_ids) == 0:
        return False

    product_ids = product_ids[0].split(",")

    for id in product_ids:
        if not id.isdigit() or int(id) < 1:
            return False
    return True