from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import SalespersonEncoder, CustomerEncoder

from .models import Customer,Salesperson

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        cus = Customer.objects.all()
        return JsonResponse(
            {"cus": cus},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            cus = Customer.objects.create(**content)
            return JsonResponse(
                cus,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a customer"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)
            props = ["name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                        customer,
                        encoder=CustomerEncoder,
                        safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_sale_persons(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons },
            encoder=SalespersonEncoder
        )