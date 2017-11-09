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

class PersonAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    queryset = Person.objects.all()

    def get(self, request):
        # pdb.set_trace()
        print('get request')

    def put(self, request):
        # pdb.set_trace()
        print('put request')

    def delete(self, request):
        # pdb.set_trace()
        print('delete request')

    def post(self, request):
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        is_staff = request.data['is_staff']

        user = Person.objects.create_user(
            username = username,
            password = password,
            email = email,
            is_staff = is_staff
        )
        user.save()

        serializer = PersonSerializer(instance=user)

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