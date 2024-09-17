from . import db
from flask_login import UserMixin
# from django.db import models
# from django.contrib.auth.models import User
# from PIL import Image

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(150), unique=True)

