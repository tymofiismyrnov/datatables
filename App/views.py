from django.shortcuts import render
from .models import Employee
from django.http import JsonResponse


# Function to render Homepage
def home(request):
    employee_list = Employee.objects.all()
    return render(request, "home.html", {'employees': employee_list})


def employee_json(request):
    employees = Employee.objects.all()
    data = [employee.get_data() for employee in employees]
    response = {'data': data}
    return JsonResponse(response)
