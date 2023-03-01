from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=50)
    employee_id = models.IntegerField(unique=True)


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)


class Sale(models.Model):
    price = models.PositiveBigIntegerField()
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE,
        null=True,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="Sale",
        on_delete=models.CASCADE,
    )

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE
    )
