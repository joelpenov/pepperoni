# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-06-06 23:19
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0006_productusage_productusagedetail'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactiondetail',
            name='unit_of_measure',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_transaction_units', to='inventory.UnitOfMeasure'),
        ),
        migrations.AddField(
            model_name='transactiondetail',
            name='unit_quantity',
            field=models.FloatField(default=1),
        ),
    ]
