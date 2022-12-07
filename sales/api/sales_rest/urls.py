from django.urls import path
from .views import api_list_technicians, api_show_technicians


urlpatterns = [
    path("sales/", api_list_technicians, name="api_list_technicians"),
    path("sales/<int:pk>/", api_show_technicians, name="api_show_technicians"),
]
