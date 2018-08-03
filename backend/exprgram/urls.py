from django.conf.urls import url

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
]
