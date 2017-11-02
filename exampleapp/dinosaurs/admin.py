from django.contrib import admin
from .models import User, Note, Folder

# admin.site.register(User)
admin.site.register(Folder)
admin.site.register(Note)