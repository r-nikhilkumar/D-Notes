# Generated by Django 5.0.3 on 2024-04-27 07:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("notesManage", "0002_alter_notes_notes_alter_user_password"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=200, unique=True),
        ),
    ]
