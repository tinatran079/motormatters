# Generated by Django 4.0.3 on 2022-12-08 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_appointment_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(default='', max_length=17),
        ),
    ]