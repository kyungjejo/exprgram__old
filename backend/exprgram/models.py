from django.db import models

# After you add/remove a model
# 1) python manage.py makemigrations && python manage.py migrate

# Create your models here.
class userInfo(models.Model):
    userid=models.TextField(primary_key=True)
    email=models.EmailField()
    country=models.CharField(max_length=2)
    mothertongue=models.CharField(max_length=10)
    englishlevel=models.CharField(max_length=15)
    familiarity=models.IntegerField()
    residence=models.CharField(max_length=3)
    reason=models.CharField(max_length=10)


class Progress(models.Model):
    userid=models.TextField()
    target=models.IntegerField()

class confidenceLabels(models.Model):
    userid=models.TextField()
    target=models.IntegerField()
    expressionValue=models.IntegerField()
    contextValue=models.IntegerField()

class similarExpression(models.Model):
    userid=models.TextField()
    target=models.IntegerField()
    expr=models.TextField()

class relationshipLables(models.Model):
    userid=models.TextField()
    target=models.IntegerField()
    label=models.TextField()
    count=models.IntegerField(default=1)

class locationLables(models.Model):
    userid=models.TextField()
    target=models.IntegerField()
    label=models.TextField()
    count=models.IntegerField(default=1)

class emotionLables(models.Model):
    userid=models.TextField()
    target=models.IntegerField()
    label=models.TextField()
    count=models.IntegerField(default=1)

class intentionLables(models.Model):
    userid=models.TextField()
    target=models.IntegerField()
    label=models.TextField()
    count=models.IntegerField(default=1)

class expressionSimilarity(models.Model):
    userid=models.TextField(default="")
    target=models.IntegerField()
    similar=models.IntegerField()