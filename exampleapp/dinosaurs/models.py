from django.db import models
from django.conf import settings
from django.contrib.auth.models import User, Group

class Person(User):
    class Meta:
        proxy = True
        ordering = ('first_name', )

    # def do_something(self):


class Folder(models.Model):
    name = models.TextField()
    parent = models.IntegerField(null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE,)

class Note(models.Model):
    parent = models.IntegerField(null=True)
    name = models.TextField()
    text = models.TextField()
    folder = models.ForeignKey(Folder, null=True)