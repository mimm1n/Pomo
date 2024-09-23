from . import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(150), unique=True)
    # def __init__(self, **kwargs):
    #     self.id = kwargs.get('id')
    #     self.email = kwargs.get('email')
    #     self.password = kwargs.get('password')
    #     self.username = kwargs.get('username')


    def __repr__(self):
        return f'<User {self.username}>'