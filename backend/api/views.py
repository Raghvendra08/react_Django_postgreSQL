from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Customer
from .serializers import CustomerSerializer, UserSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

# API endpoint for user registration
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_200_OK)

# API endpoint for user login
@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=200)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)

# API endpoint for user logout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    logout(request)
    return Response({'message': 'Successfully logged out'}, status=200)

# API endpoint for creating a customer (requires authentication)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_customer(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
