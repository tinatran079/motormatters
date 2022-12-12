# CarCar

Team:

* Tina - Automobile Service
* Christopher - Auto Sales

## Design

## Service microservice

I created three models for my microservice, Technician, Appointment and a VIN Value Object model. The Technician model had two fields attached to it, the technician name and their employee number. The Appointment model has the customer name, data, time, reason, technician name, and vin associated with it. I made the technician name a foreign key as one technician could have many appointments assigned to them. The VIN Value Object model has just the vin associated with it. I decided to poll the VIN data from the inventory microservice into the service microservice. The customer making the appointment does not need to have a pre-exisiting VIN in the inventory. When making the appointment, it checks to see if the VIN entered is already in the inventory. If it has been registered, then the automobile was purchased from the dealership, and the customer would show up as a "vip" client.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.
