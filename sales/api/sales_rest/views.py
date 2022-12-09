from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import SalespersonEncoder, CustomerEncoder, SaleEncoder, AutomobileVOEncoder

from .models import Customer,Salesperson, Sale, AutomobileVO

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
            {"salespersons": salespersons},
            encoder=SalespersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sale_persons = Salesperson.objects.create(**content)
            return JsonResponse(
                sale_persons,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create saleperson"}
            )
            response.status_code=400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale_person(request, pk):
    if request.method == "GET":
        try:
            saleperson = Salesperson.objects.get(employee_id=pk)
            return JsonResponse(
                saleperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            saleperson = Salesperson.objects.get(employee_id=pk)
            saleperson.delete()
            return JsonResponse(
                saleperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            saleperson = Salesperson.objects.get(employee_id=pk)
            props = ["name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(saleperson, prop, content[prop])
                    saleperson.save()
                    return JsonResponse(
                        saleperson,
                        encoder=SalespersonEncoder,
                        safe=False,
                    )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sale(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sale": sale},
            encoder=SaleEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content["vin"]
            autos = AutomobileVO.objects.get(vin=vin)
            content["autos"] = autos
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Vin Does not exist"},
                status=400,
            )
        try:
            salesperson = content["salesperson"]
            sales_assoicate = Salesperson.objects.get(name=salesperson)
            content["salesperson"] = sales_assoicate
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Sales Associate does not exist"},
            status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_automobile(request):
    automobile = AutomobileVO.objects.all()
    return JsonResponse(
        automobile,
        encoder=AutomobileVOEncoder,
        safe=False,
    )