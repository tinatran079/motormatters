from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
from .encoders import TechnicianListEncoder, TechnicianDetailEncoder, AppointmentListEncoder, AppointmentDetailEncoder, AutomobileVODetailEncoder


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder = TechnicianDetailEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create a technician"},
                status = 400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_technicians(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"}
            )
        return JsonResponse(
            technician,
            encoder = TechnicianDetailEncoder,
            safe=False,
        )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            Technician.objects.filter(id=pk).update(**content)
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"}
            )
    else:
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, automobile_vo_id=None):
    if request.method == "GET":
        if automobile_vo_id is not None:
            appointments = Appointment.objects.filter(appointment=automobile_vo_id)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin = content["vin"]
            appointment = AutomobileVO.objects.get(vin=vin)
            content["appointment"] = appointment
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "VIN does not exist"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
