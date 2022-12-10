from django.contrib import admin
from .models import Post, Comments

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    list_display = ['id', 'user', 'like_number', 'comment_number', 'created_at', 'updated_at']
    list_display_links = ['id', 'user', 'like_number', 'comment_number', 'created_at', 'updated_at']

@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):

    list_display = ['id', 'user', 'created_at', 'updated_at']
    list_display_links = ['id', 'user', 'created_at', 'updated_at']