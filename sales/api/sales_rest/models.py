from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.PositiveBigIntegerField(blank=True, null=True)


class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(blank=True, null=True)

class Appointment(models.Model):
    customer_name = models.CharField(max_length=200)
    date = models.DateField(auto_now=False)
    time = models.TimeField(auto_now=False)
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

    def __str__(self):
        return self.customer_name
