from django.db import models
from uuid import uuid4

from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin

class CustomUserManager(UserManager):

    def _create_user(self, name, username, email, password, image, **extra):

        if not name:
            return ValueError('O nome não foi informado!')
        if not username:
            return ValueError('O username não foi informado!')
        if not email:
            return ValueError('O e-mail não foi informado!')
        if not password:
            return ValueError('A senha não foi informada!')
        
        email = self.normalize_email(email)
        user = self.model(name=name, username=username, email=email, image='default.png', **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, name=None, username=None, email=None, password=None, image=None, **extra):

        extra.setdefault('is_superuser', False)
        extra.setdefault('is_staff', False)
        return self._create_user(name=name, username=username, email=email, password=password, image=image, **extra)
    
    def create_superuser(self, name=None, username=None, email=None, password=None, image=None, **extra):

        extra.setdefault('is_superuser', True)
        extra.setdefault('is_staff', True)
        return self._create_user(name=name, username=username, email=email, password=password, image=image, **extra)

def getImageUrl(instance, filename):
    return f'users/{instance.id}-{filename}'

class User(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(default=uuid4, primary_key=True)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    image = models.ImageField(upload_to=getImageUrl, blank=True, null=True)

    followers = models.ManyToManyField('self', blank=True)
    follower_number = models.IntegerField(default=0, null=True, blank=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    REQUIRED_FIELDS = ['name', 'username']
    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    def __str__(self):
        return self.name