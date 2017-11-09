from django.db import models
from django.conf import settings
from django.contrib.auth.models import User, Group

class Person(User):
    class Meta:
        proxy = True
        ordering = ('first_name', )

    def __str__(self):
        return str(self.username)

    def validate_password(self, value: str) -> str:
        return make_password(value)

    # def do_something(self):


class Folder(models.Model):
    name = models.TextField()
    parent = models.IntegerField(null=True, blank=True)
    author = models.ForeignKey(Person, null=True, blank=True, related_name='folders', on_delete=models.CASCADE,)
    is_root = models.BooleanField(blank=True)

    def __str__(self):
        return str(self.name)

class Note(models.Model):
    # parent = models.IntegerField(null=True)
    name = models.TextField()
    text = models.TextField()
    date = models.DateTimeField(blank=True)
    folder = models.ForeignKey(Folder, null=True, blank=True, related_name='notes', on_delete=models.CASCADE,)
    author = models.ForeignKey(Person, null=True, blank=True, related_name='notes', on_delete=models.CASCADE,)

    def __str__(self):
        return str(self.name)