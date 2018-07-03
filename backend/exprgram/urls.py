from django.conf.urls import url

from . import views

urlpatterns = [
    url('fetchVideoList', views.fetchVideoList, name='fetchVideoList'),
    url('fetchSubtitle', views.fetchSubtitle, name='fetchSubtitle'),
]