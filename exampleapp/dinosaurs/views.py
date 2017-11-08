from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import detail_route
from dinosaurs.serializers import PersonSerializer, FolderSerializer, NoteSerializer, GroupSerializer
from dinosaurs.models import Folder, Note, Person
from django.contrib.auth.models import Group
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, UserManager
import pdb
from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from rest_framework.renderers import JSONRenderer
import json
from rest_framework import authentication
from rest_framework import exceptions
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication 

# class CsrfExemptSessionAuthentication(SessionAuthentication):

#     def enforce_csrf(self, request):
#         return  # To not perform the csrf check previously happening

class MyUserManager(BaseUserManager):
    def create_user(self, username, password, email, is_staff):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            is_staff = is_staff
        )

        user.set_password(password)
        user.save(using = self._db)
        return user

class PersonAPIView(APIView):
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = [permissions.AllowAny]
    queryset = Person.objects.all()
    # serializer_class = PersonSerializer

    def get(self, request):
        pdb.set_trace()

    def put(self, request):
        pdb.set_trace()

    def delete(self, request):
        pdb.set_trace()

    def post(self, request):
        pdb.set_trace()
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        is_staff = request.data['is_staff']
        pdb.set_trace()
        pdb.set_trace()
        # user = {
        #     'username': username,
        #     'email': email,
        #     'is_staff': is_staff,
        #     'password': password,
        #     'notes': [],
        #     'folders': []
        # }
        # user.set_password(request.data['password'])
        user = MyUserManager.create_user(
            UserManager,
            username = username,
            email = email,
            password = password,
            is_staff = is_staff,
        )
        # user = MyUserManager.create_user(
        #     self,
        #     username = username,
        #     email = email,
        #     password = password,
        #     is_staff = is_staff,
        # )
        pdb.set_trace()
        # AbstractBaseUser.create_user(
        #     username = username,
        #     email = email,
        #     is_staff = is_staff,
        #     password = password
        # )
        pdb.set_trace()
        serializer = PersonSerializer(instance=user)
        pdb.set_trace()
        # serializer.save()
        # PersonSerializer.save(user)
        pdb.set_trace()
        return HttpResponse(json.dumps(serializer.data))

class FolderViewSet(viewsets.ModelViewSet):
    serializer_class = FolderSerializer
    queryset = Folder.objects.all()

    def list(self, request):
        # pdb.set_trace()
        serializer = FolderSerializer(Folder.objects.filter(author = request.user.id), many=True)
        return HttpResponse(json.dumps(serializer.data))

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

    def list(self, request):
        # pdb.set_trace()
        serializer = NoteSerializer(Note.objects.filter(author = request.user.id), many=True)
        return HttpResponse(json.dumps(serializer.data))

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer