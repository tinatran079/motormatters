# Generated by Django 4.0.3 on 2022-12-07 15:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_automobilevo_alter_salesperson_employee_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchaser_name', models.CharField(max_length=200)),
                ('price', models.PositiveBigIntegerField()),
                ('sales_person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Sale', to='sales_rest.salesperson')),
                ('vin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sale', to='sales_rest.automobilevo')),
            ],
        ),
        migrations.DeleteModel(
            name='Sale_Record',
        ),
    ]