# Generated by Django 4.0.3 on 2022-12-08 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_alter_appointment_vin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='time',
        ),
        migrations.AlterField(
            model_name='appointment',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
