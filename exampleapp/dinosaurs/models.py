from django.db import models


class Dinosaur(models.Model):
    species = models.TextField()

class User(models.Model):
    firstName = models.TextField()
    lastName = models.TextField()
    email = models.TextField()
    age = models.TextField()

class Note(models.Model):
    parent = models.IntegerField(null=True)
    name = models.TextField()
    text = models.TextField()

class Folder(models.Model):
    name = models.TextField()
    parent = models.IntegerField(null=True)