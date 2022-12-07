from django.urls import path
from .views import api_customers, api_customer

urlpatterns = [
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer")
]