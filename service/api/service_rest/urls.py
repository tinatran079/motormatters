from django.urls import path
from .views import (
    api_appointments,
    api_technicians,
    api_show_appointment,
    api_automobile_vo,
    api_show_technicians,
)


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_show_technicians, name="api_show_technicians"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("automobilesvo/", api_automobile_vo, name="api_automobile_vo"),
]
