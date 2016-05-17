from django.db import models


class UnitOfMeasure(models.Model):
    description=models.CharField(max_length=50)
    abbreviation=models.CharField(max_length=20)

    def __str__(self):
        return self.description