from django.urls import path
from .views import api_appointments, api_technicians, api_delete_appointment, api_automobile_vo


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_delete_appointment, name="api_delete_appointment"),
    path("automobilesvo/", api_automobile_vo, name="api_automobile_vo"),
]
