from common.json import ModelEncoder
from .models import Customer, SalesPerson, Sale, AutomobileVO

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_id",
    ]

class AutomobileVoEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "sales_person",
        "customer",
        "automobile",
        "price",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerListEncoder(),
        "automobile": AutomobileVoEncoder(),
    }
