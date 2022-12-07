from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return self.technician_name

class Appointment(models.Model):
    customer_name = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now=False)
    reason = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="appoinements",
        on_delete=models.CASCADE,
    )
