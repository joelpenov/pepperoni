# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-07 11:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='average_cost',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='cost',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='sell_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='stock',
            field=models.FloatField(default=0),
        ),
    ]
