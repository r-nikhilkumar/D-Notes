from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length = 200)
    password = models.CharField(max_length = 30)
    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set')
    username = models.CharField(max_length=30)
    
    def __str__(self):
        return str(self.email)

class Notes(models.Model):
    title = models.CharField(max_length=100)
    notes = models.TextField(null = True, blank= True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/', null=True, blank=True)

    def __str__(self):
        return self.title
