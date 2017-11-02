from dinosaurs.models import Folder, Note
from rest_framework import serializers
from django.contrib.auth.models import User, Group

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'first_name', 'email')

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