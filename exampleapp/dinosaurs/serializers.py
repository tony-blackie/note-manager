from dinosaurs.models import Folder, Note, Person
from rest_framework import serializers
from django.contrib.auth.models import Group

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    notes = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all())
    folders = serializers.PrimaryKeyRelatedField(many=True, queryset=Folder.objects.all())

    class Meta:
        model = Person
        fields = ('id', 'username', 'email', 'password', 'notes', 'folders')

class FolderSerializer(serializers.HyperlinkedModelSerializer):
    notes = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all())

    class Meta:
        model = Folder
        fields = ('id', 'name', 'parent', 'is_root', 'notes')

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'parent', 'name', 'text')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group