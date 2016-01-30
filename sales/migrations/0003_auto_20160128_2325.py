# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-29 03:25
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('inventory', '0001_initial'),
        ('sales', '0002_auto_20160125_1612'),
    ]

    operations = [
        migrations.CreateModel(
            name='CashierShift',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField(blank=True)),
                ('close_balance', models.FloatField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(blank=True, max_length=70)),
                ('customer_address', models.CharField(blank=True, max_length=180)),
                ('customer_reference', models.CharField(blank=True, max_length=180)),
                ('customer_phone', models.CharField(blank=True, max_length=15)),
                ('order_number', models.IntegerField()),
                ('order_date', models.DateTimeField()),
                ('status', models.CharField(max_length=15)),
                ('total', models.FloatField()),
                ('cash', models.FloatField()),
                ('customer_change', models.FloatField()),
                ('cashier_shift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='sales.CashierShift')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.FloatField()),
                ('price', models.FloatField()),
                ('total', models.FloatField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to='sales.Order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sale_order_details', to='inventory.Product')),
            ],
        ),
        migrations.AddField(
            model_name='cashregister',
            name='status',
            field=models.CharField(default=1, max_length=15),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cashregister',
            name='warehouse',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='cash_registers', to='inventory.Warehouse'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone',
            field=models.CharField(db_index=True, max_length=15, unique=True),
        ),
        migrations.AddField(
            model_name='order',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sales.Customer'),
        ),
        migrations.AddField(
            model_name='cashiershift',
            name='cash_register',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cashier_shifts', to='sales.CashRegister'),
        ),
        migrations.AddField(
            model_name='cashiershift',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cashier_users', to=settings.AUTH_USER_MODEL),
        ),
    ]