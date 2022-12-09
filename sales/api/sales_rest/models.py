from django.db import models
from django.urls import reverse

class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField(primary_key=True, unique=True)

    def __str__(self):
        return self.name

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)



    def __str__(self):
        return self.name


class Sale(models.Model):
    price = models.PositiveBigIntegerField()
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE,
        null=True,
    )
    sales_person = models.ForeignKey(
        Salesperson,
        related_name="Sale",
        on_delete=models.CASCADE,
    )

    vin = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE
    )


