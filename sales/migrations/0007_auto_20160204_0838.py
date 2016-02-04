# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-02-04 12:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0006_auto_20160202_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='clear',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='update_customer_entry',
            field=models.BooleanField(default=False),
        ),
    ]
