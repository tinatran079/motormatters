from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
from .encoders import TechnicianEncoder, AutomobileVOEncoder, AppointmentEncoder


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians}, encoder=TechnicianEncoder, safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create a technician"},
                status=404,
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_technicians(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"Message": "Could not create Technician"},
                status=404,
            )
        Technician.objects.filter(id=pk).update(**content)
        technician = Technician.objects.get(id=pk)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments}, encoder=AppointmentEncoder, safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                {"appointments": appointment},
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician"},
                status=404,
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods("GET")
def api_automobile_vo(request):
    if request.method == "GET":
        auto = AutomobileVO.objects.all()
        return JsonResponse({"auto": auto}, encoder=AutomobileVOEncoder)
