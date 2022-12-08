from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
from .encoders import TechnicianEncoder, AutomobileVOEncoder, AppointmentEncoder


@require_http_methods(["GET", "POST"])
# Get list of technicians
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    # Create a technician
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder = TechnicianEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create a technician"},
                status = 400,
            )


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    # Get list of appointments
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        # Create an appointment
        content = json.loads(request.body)
        try:
            vin = content["vin"]
            autos = AutomobileVO.objects.get(vin=vin)
            content["autos"] = autos
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "VIN does not exist"},
                status=400,
            )
        try:
            technician = content["technician"]
            tech = Technician.objects.get(technician_name=technician)
            content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_appointment(request,pk):
    count, _ = Appointment.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})
