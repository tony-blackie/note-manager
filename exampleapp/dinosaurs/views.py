from rest_framework import viewsets
from rest_framework.decorators import detail_route
from dinosaurs.serializers import PersonSerializer, FolderSerializer, NoteSerializer, GroupSerializer
from dinosaurs.models import Folder, Note, Person
from django.contrib.auth.models import Group
import pdb
from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from rest_framework.renderers import JSONRenderer
import json

class PersonViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

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