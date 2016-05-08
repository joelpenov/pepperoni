# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-05-08 17:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0002_order_printed'),
    ]

    operations = [
        migrations.CreateModel(
            name='CashierShiftMoneyDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.FloatField()),
                ('value', models.FloatField()),
                ('cashier_shift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cashier_shift_money', to='sales.CashierShift')),
            ],
        ),
    ]
