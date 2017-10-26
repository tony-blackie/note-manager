from rest_framework import viewsets
from rest_framework.decorators import detail_route
from dinosaurs.serializers import DinosaurSerializer, UserSerializer, FolderSerializer, NoteSerializer
from dinosaurs.models import Dinosaur, User, Folder, Note
import pdb


class DinosaurViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Dinosaur.objects.all()
    serializer_class = DinosaurSerializer

class UserViewSet(viewsets.ModelViewSet):
    pdb.set_trace()
    print(User.objects)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FolderViewSet(viewsets.ModelViewSet):
    pdb.set_trace()
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

class NoteViewSet(viewsets.ModelViewSet):
    pdb.set_trace()
    queryset = Note.objects.all()
    serializer_class = NoteSerializer