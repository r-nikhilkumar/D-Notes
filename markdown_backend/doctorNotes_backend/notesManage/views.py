from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Notes
from .services import getUserService, getLoginUserService
from .serializers import UserSerializer, NotesSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"status":"ok","data":serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class LoginView(APIView):
 def post(self, request, *args, **kwargs):
  user = getLoginUserService(request)
  if user == None:
   return Response({
    "status": "Login failed", 
    "message": f"No user with the corresponding email and password exists"
    }, 
    status=status.HTTP_404_NOT_FOUND)
  return Response({ "status": "Logined In", 'id': user.id })

class CreateNotesView(generics.CreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"status":"ok","data":serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

class UpdateNotesView(generics.UpdateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class GetAllUsers(APIView):
    def post(self, request):
        user = getUserService(request)
        if user is not None:
            userlist = User.objects.all()
            serializer = UserSerializer(userlist, many=True)
            return Response({"status":"ok","users":serializer.data})
        else:
            return Response({"status":"400", "message":"user not found!"})