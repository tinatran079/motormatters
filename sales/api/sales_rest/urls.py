from django.urls import path
from .views import api_customers, api_customer, api_sale_persons, api_sale_person, api_sale

urlpatterns = [
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("salepersons/", api_sale_persons, name="api_sale_persons"),
    path("salepersons/<int:pk>/", api_sale_person, name="api_sale_person"),
    path("sales/", api_sale, name="api_sale")
]