# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-05-21 21:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_auto_20160424_1139'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='print_on_cashier_shift',
            field=models.BooleanField(default=False),
        ),
    ]
