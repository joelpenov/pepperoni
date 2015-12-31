from django.conf.urls import url
from inventory import views

urlpatterns=[
		url(r'^test', views.index),
	]