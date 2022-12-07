from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "technician_name",
        "employee_number",
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "technician_name",
        "employee_number",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "customer_name",
        "date",
        "time",
        "reason",
        "technician",
        "vin"
    ]
    encoders = {
        "vin": AutomobileVODetailEncoder(),
    }

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer_name",
        "date",
        "time",
        "reason",
        "technician",
        "vin"
    ]
    encoders = {
        "vin": AutomobileVODetailEncoder(),
    }
