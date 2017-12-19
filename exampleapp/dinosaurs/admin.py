from django.contrib import admin
from .models import User, Note, Folder, Person, Questionnaire

admin.site.register(Person)
admin.site.register(Folder)
admin.site.register(Note)
admin.site.register(Questionnaire)