from dinosaurs.models import Folder, Note, Person
from rest_framework import serializers
from django.contrib.auth.models import Group

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'username', 'email', 'password')

class FolderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'name', 'parent')

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'parent', 'name', 'text')

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group