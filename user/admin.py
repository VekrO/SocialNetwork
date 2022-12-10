from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'username', 'email']
    list_display_links = ['id', 'name', 'username', 'email']
    readonly_fields = ['password']