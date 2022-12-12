from common.json import ModelEncoder
from .models import Customer, Salesperson, Sale, AutomobileVO

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_id",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "customer",
        "sales_person",
        "vin",
    ]
    encoders = {
        "sales_person": SalespersonEncoder(),
        "vin": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
    }
