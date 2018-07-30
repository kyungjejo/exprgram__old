from django.conf.urls import url
from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url('fetchVideoList', views.fetchVideoList, name='fetchVideoList'),
    url('fetchSubtitle', views.fetchSubtitle, name='fetchSubtitle'),
    url('register', views.register, name="register"),
    url('fetchSimilarVideos', views.fetchSimilar, name="fetchSimilar"),
    url('login', views.login, name='login'),
    url('progressCheck', views.progressCheck, name='progressCheck'),
    url('activityResponse', views.activityResponse, name='activityResponse'),
    url('labelBandit', views.labelBandit, name="labelBandit"),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]