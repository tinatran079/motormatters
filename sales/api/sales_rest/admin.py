from django.contrib import admin
from.models import AutomobileVO, Technician, Appointment

# Register your models here.
admin.site.register(Technician)
admin.site.register(Appointment)
admin.site.register(AutomobileVO)
