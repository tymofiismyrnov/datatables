import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "datatables.settings")
django.setup()

from faker import Faker
from random import randint, choice
from App.models import Employee


def populate(num):
    fake = Faker()
    id = Employee.objects.all()[len(Employee.objects.all()) - 1].id + 1
    for user in range(num):
        fake_id = id
        fake_name = fake.name()
        fake_email = fake.email()
        fake_occupation = fake.job()
        fake_salary = f'$ {randint(100, 10000)}'
        fake_gender = choice(['M', 'F'])

        Employee.objects.get_or_create(id=fake_id,
                                       name=fake_name,
                                       email=fake_email,
                                       occupation=fake_occupation,
                                       salary=fake_salary,
                                       gender=fake_gender)

        id += 1


populate(10)
