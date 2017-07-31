from django.contrib import admin
from .models import User, Dinosaur, Note, Folder

admin.site.register(User)
admin.site.register(Dinosaur)
admin.site.register(Folder)
admin.site.register(Note)