from django.contrib import admin
from .models import Customer, SalesPerson, Sale, AutomobileVO


# Register your models here.
admin.site.register(Customer)
admin.site.register(SalesPerson)
admin.site.register(Sale)
admin.site.register(AutomobileVO)
