"""crunchy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin

from rest_framework import routers

from sales import urls as sales_url
from products import urls as products_urls
from customer import urls as customer_urls
from inventory import urls as inventory_urls

router = routers.DefaultRouter()

inventory_urls.registerApiUrls(router)
products_urls.registerApiUrls(router)
customer_urls.registerApiUrls(router)
sales_url.registerApiUrls(router)

urlpatterns = [
    url(r'^inventory/', include('inventory.urls')),
    url(r'^products/', include('products.urls')),
    url(r'^customers/', include('customer.urls')),
    url(r'^sales/', include('sales.urls')),
	url(r'^api/', include(router.urls)),
	url(r'^$', include('main.urls')),
    url(r'^admin/', admin.site.urls),
	#url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
