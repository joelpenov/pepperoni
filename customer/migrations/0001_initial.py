# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-24 12:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=70)),
                ('address', models.CharField(blank=True, max_length=180)),
                ('reference', models.CharField(blank=True, max_length=180)),
                ('phone', models.CharField(max_length=15, unique=True)),
            ],
        ),
    ]
