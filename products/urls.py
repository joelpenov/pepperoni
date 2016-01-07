from django.conf.urls import url
from products import views

urlpatterns=[
		url(r'^create', views.create),
		url(r'', views.index),
	]