# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-02-05 09:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0013_auto_20160204_2224'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='delivered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='order',
            name='to_go',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='order',
            name='to_pickup',
            field=models.BooleanField(default=False),
        ),
    ]
