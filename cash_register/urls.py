from django.conf.urls import url

from cash_register import views

urlpatterns=[
		url(r'', views.index),
	]