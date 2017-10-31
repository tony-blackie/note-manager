from rest_framework import viewsets
from rest_framework.decorators import detail_route
from dinosaurs.serializers import DinosaurSerializer, UserSerializer, FolderSerializer, NoteSerializer, GroupSerializer
from dinosaurs.models import Dinosaur, Folder, Note
from django.contrib.auth.models import User, Group
import pdb
from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from rest_framework.renderers import JSONRenderer
import json


class DinosaurViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Dinosaur.objects.all()
    serializer_class = DinosaurSerializer

# class UserViewSet(viewsets.ModelViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

    # def get(self, request):
    #     pdb.set_trace()

    # def list(self, request):
    #     pdb.set_trace()

    # def post(self, request):
    #     pdb.set_trace()




class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()

    def list(self, request):
        # pdb.set_trace()
        serializer = FolderSerializer(Folder.objects.filter(author = request.user.id), many=True)
        return HttpResponse(json.dumps(serializer.data))

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

# # ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer