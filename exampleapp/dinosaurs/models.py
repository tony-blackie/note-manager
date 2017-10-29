from django.db import models
from django.conf import settings

class Dinosaur(models.Model):
    species = models.TextField()

class User(models.Model):
    first_name = models.TextField()
    email = models.TextField()
    password = models.TextField()

class Folder(models.Model):
    name = models.TextField()
    parent = models.IntegerField(null=True)
    author = models.ForeignKey(User)

class Note(models.Model):
    parent = models.IntegerField(null=True)
    name = models.TextField()
    text = models.TextField()
    folder = models.ForeignKey(Folder, null=True)