from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def get_api_url(self):
        return reverse("api_vin", kwargs={"pk": self.id})

    def __str__(self):
        return self.vin


class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(blank=True, null=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})

    def __str__(self):
        return self.technician_name


class Appointment(models.Model):
    vin = models.CharField(max_length=17, default="")
    customer_name = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now=False)
    reason = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
