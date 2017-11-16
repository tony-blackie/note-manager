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
import re
from rest_framework.response import Response
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer

# class CustomBrowsableAPIRenderer(BrowsableAPIRenderer):
#     def get_default_renderer(self, view):
#         return JSONRenderer()

class PersonAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    queryset = Person.objects.all()

    def get(self, request):
        print('get request')

    def put(self, request):
        print('put request')

    def delete(self, request):
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

# class AdminFoldersViewset(viewsets.ModelViewSet):
#     permission_classes = [permissions.IsAdminUser]
#     serializer_class = FolderSerializer
#     queryset = Folder.objects.all()

class FolderAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = FolderSerializer
    queryset = Folder.objects.all()

    def get(self, request, id = None):
        def remove_slashes(string):
            return string.replace('/', '')

        if id == '':
            if re.search(r'admin/dinosaurs/folder/$', request.path):
                folders = Folder.objects.all()
                serializer = FolderSerializer(folders, many=True)
                return Response(serializer.data)

            if re.search(r'/folder/$', request.path):
                userId = request.user.id

                try:
                    folders = Folder.objects.filter(author=userId)
                except Folder.DoesNotExist:
                    return Response([])

                serializer = FolderSerializer(Folder.objects.filter(author = request.user.id), many=True)

                return Response(serializer.data)

            if re.search(r'/folder/', request.path):
                userId = request.user.id

                try:
                    folders = Folder.objects.filter(author=userId)
                except Folder.DoesNotExist:
                    return Response([])

                serializer = FolderSerializer(Folder.objects.filter(author = request.user.id), many=True)

                return Response(serializer.data)
        else:
            id = int(remove_slashes(id))
            userId = request.user.id
            serializer = FolderSerializer(Folder.objects.get(author = request.user.id, id = id))
            return Response(serializer.data)

    def post(self, request, id = None):
        userId = request.user.id

        Folder.objects.create(
            name = request.data.get('name', 'newName'),
            parent = request.data.get('parent', 4),
            is_root = request.data.get('is_root', False),
            author = request.user
        )

        serializer = FolderSerializer(Folder.objects.filter(author = request.user.id), many=True)
        return Response(serializer.data)

    def put(self, request, id = None):
        userId = request.user.id
        folder = Folder.objects.get(id = userId, author = request.user.id)

        folder.name = request.data.get('name')
        folder.save()

        serializer = FolderSerializer(folder)
        return Response(serializer.data)

    def delete(self, request):
        # TODO: Remove notes associated with deleted folder, if it's not empty
        userId = request.data.user
        serializer = FolderSerializer(Folder.objects.filter(author = request.user.id), many=True)
        return Response(serializer.data)

class NoteAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

    def get(self, request, id = None):
        def remove_slashes(string):
            return string.replace('/', '')

        if id == '':
            if re.search(r'admin/dinosaurs/note/$', request.path):
                notes = Note.objects.all()
                serializer = NoteSerializer(notes, many=True)
                return Response(serializer.data)

            if re.search(r'/note/$', request.path):
                userId = request.user.id

                try:
                    notes = Note.objects.filter(author=userId)
                except Note.DoesNotExist:
                    return Response([])

                serializer = NoteSerializer(Note.objects.filter(author = request.user.id), many=True)

                return Response(serializer.data)

            if re.search(r'/note/', request.path):
                userId = request.user.id

                try:
                    notes = Note.objects.filter(author=userId)
                except Note.DoesNotExist:
                    return Response([])

                serializer = NoteSerializer(Note.objects.filter(author = request.user.id), many=True)

                return Response(serializer.data)
        else:
            id = int(remove_slashes(id))
            userId = request.user.id
            serializer = NoteSerializer(Note.objects.get(author = request.user.id, id = id))
            return Response(serializer.data)

    def post(self, request, id = None):
        userId = request.user.id
        parentFolderId = request.data.get('folder', None)

        if parentFolderId:
            parentFolder = Folder.objects.get(id=int(parentFolderId))
        else:
            foldersForCurrentUser = Folder.objects.filter(author=userId)
            for folder in foldersForCurrentUser:
                if folder.is_root == True:
                    parentFolder = folder

        note = Note.objects.create(
            name = request.data.get('name', 'newName'),
            text = request.data.get('text', 'defaultText'),
            folder = parentFolder,
            author = request.user
        )

        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, id = None):
        userId = request.user.id
        folder = Folder.objects.get(id = userId, author = request.user.id)

        folder.name = request.data.get('name')
        folder.save()

        serializer = FolderSerializer(folder)
        return Response(serializer.data)

    def delete(self, request):
        userId = request.data.user
        serializer = FolderSerializer(Folder.objects.filter(author = request.user.id), many=True)
        return Response(serializer.data)

# class NoteViewSet(viewsets.ModelViewSet):
#     serializer_class = NoteSerializer
#     queryset = Note.objects.all()

#     def list(self, request):
#         serializer = NoteSerializer(Note.objects.filter(author = request.user.id), many=True)
#         return HttpResponse(json.dumps(serializer.data))

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer