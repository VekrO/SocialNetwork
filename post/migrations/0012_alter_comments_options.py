# Generated by Django 4.1.4 on 2022-12-09 21:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0011_remove_comments_post_alter_post_comments'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comments',
            options={'ordering': ['-created_at'], 'verbose_name': 'Comment', 'verbose_name_plural': 'Comments'},
        ),
    ]
