# Generated by Django 2.0.6 on 2018-07-19 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exprgram', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfo',
            name='id',
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='userid',
            field=models.TextField(primary_key=True, serialize=False),
        ),
    ]
