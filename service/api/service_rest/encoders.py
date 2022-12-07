from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "technician_name",
        "employee_number",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer_name",
        "date",
        "reason",
        "technician",
        "vin"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
        "vin": AutomobileVOEncoder()
    }
