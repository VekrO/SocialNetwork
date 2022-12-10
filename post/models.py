from django.db import models
from user.models import User
from uuid import uuid4

class Comments(models.Model):

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
        ordering = ['-updated_at']

    id = models.UUIDField(default=uuid4, primary_key=True)
    description = models.TextField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

def getImageUrl(instance, filename):
    return f'posts/{instance.id}-{filename}'

class Post(models.Model):

    id = models.UUIDField(default=uuid4, primary_key=True)
    description = models.TextField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=getImageUrl, null=True, blank=True)
    likers = models.ManyToManyField(User, related_name='user_liker')
    comments = models.ManyToManyField(Comments, related_name='user_comment')
    like_number = models.IntegerField(default=0)
    comment_number = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
