from django.contrib import admin
from .models import User, Note, Folder, Person

admin.site.register(Person)
admin.site.register(Folder)
admin.site.register(Note)