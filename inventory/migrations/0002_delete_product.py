# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-01 14:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Product',
        ),
    ]
