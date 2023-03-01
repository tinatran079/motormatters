from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Sale, Customer, AutomobileVO, SalesPerson
from .encoders import CustomerListEncoder, CustomerDetailEncoder, SalesPersonEncoder, AutomobileVoEncoder, SaleEncoder


@require_http_methods(["GET"])
def list_automobile_vos(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder = AutomobileVoEncoder,
        )


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder = CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        name = content["name"]
        address = content["address"]
        phone_number = content["phone_number"]
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder = CustomerDetailEncoder,
            safe = False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder = CustomerDetailEncoder,
                safe = False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status = 404,
            )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=id)
            name = content["name"]
            address = content["address"]
            phone_number = content["phone_number"]
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder = CustomerDetailEncoder,
                safe = False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status = 404,
            )
    else:
        try:
            customer = Customer.objects.filter(id=id).delete()
            return JsonResponse({"message": "customer deleted"})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status = 404,
            )

@require_http_methods(["GET", "POST"])
def list_sales_persons(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        name = content["name"]
        employee_id = content["employee_id"]
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_sales_person(request, id):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
        )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            name = content["name"]
            employee_id = content["employee_id"]
            SalesPerson.objects.filter(id=id).update(**content)
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )
    else:
        try:
            sales_person = SalesPerson.objects.filter(id=id).delete()
            return JsonResponse({"message": "Sales person deleted"})
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            sales_person = content["sales_person"]
            sp = SalesPerson.objects.get(employee_id=sales_person)
            content["sales_person"] = sp
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )
        try:
            vin = content["automobile"]
            auto = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist"},
                status=404,
            )
        price = content["price"]
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def show_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder = SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No record of sale"},
                status=404,
            )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            sales_person = content["sales_person"]
            Sale.objects.filter(id=id).update(sales_person=sales_person)
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No record of sale"},
                status=404,
            )
    else:
        try:
            sale = Sale.objects.filter(id=id).delete()
            return JsonResponse({"message": "Sale removed from records"})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No record of sale"},
                status=404,
            )
