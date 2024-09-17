from . import db
from flask_login import UserMixin
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FileField
from wtforms.validators import DataRequired
from datetime import datetime


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(150), unique=True)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    profile_pic = db.Column(db.String(), nullable=True)

    def is_authenticated(self):
        return True     

    def is_active(self):
        return True

#creating 
class User(UserMixin, db.Model):
    # ...
    def ping(self):
        self.last_seen = (datetime.utcnow)
        db.session.add(self)
        db.session.commit()


class UserForm(FlaskForm):
   profile_pic = FileField("Profile Pic") 
    
