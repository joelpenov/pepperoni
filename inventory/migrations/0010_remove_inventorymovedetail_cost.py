# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-17 20:14
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0009_auto_20160117_1548'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventorymovedetail',
            name='cost',
        ),
    ]