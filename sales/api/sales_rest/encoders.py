from common.json import ModelEncoder
from .models import Customer, Salesperson

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