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
    target=models.IntegerField()
    expr=models.TextField()
    vote=models.IntegerField(default=0)

class relationshipLables(models.Model):
    target=models.IntegerField()
    label=models.TextField()
    vote=models.IntegerField(default=0)

class locationLables(models.Model):
    target=models.IntegerField()
    label=models.TextField()
    vote=models.IntegerField(default=0)

class emotionLables(models.Model):
    target=models.IntegerField()
    label=models.TextField()
    vote=models.IntegerField(default=0)

class intentionLables(models.Model):
    target=models.IntegerField()
    label=models.TextField()
    vote=models.IntegerField(default=0)

class expressionSimilarity(models.Model):
    target=models.IntegerField()
    similar=models.IntegerField()
    vote=models.IntegerField(default=0)