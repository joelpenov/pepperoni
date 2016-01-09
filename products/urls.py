from django.conf.urls import url
from rest_framework import routers

from products import views


router = routers.DefaultRouter();
router.register(r'', views.ProductList)
#urlpatterns = format_suffix_patterns(urlpatterns)


urlpatterns=[
	#url(r'^', router.urls),
		#url(r'api/(?P<pk>[0-9]+)/$', views.list.as_view()),
		#url(r'^create', views.create),
		#url(r'', views.index),
	]
