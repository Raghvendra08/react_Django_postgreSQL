from django.urls import path
from .views import  user_login, user_logout, create_customer,register

urlpatterns = [
    path('login/', user_login, name='login'),
    path('registeruser/', register, name='register'),
    path('logout/', user_logout, name='logout'),
    path('save-customer/', create_customer, name='save_customer_data'),
]