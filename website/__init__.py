from flask import Flask, render_template, flash, request, redirect, url_for
from os import path
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_moment import Moment


db = SQLAlchemy()
DB_NAME = "database.db"
moment = Moment()   

def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")
    app.config["SECRET_KEY"] = "W3AR3TH3COD3RS"
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database1.db'
    db.init_app(app)
    moment.init_app(app)
    
    from .views import views
    from .auth import auth
    
    app.register_blueprint(views, url_prefix = '/' )
    app.register_blueprint(auth, url_prefix = '/' )
    
    from .models import User
    
    with app.app_context():
        db.create_all()
    
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    
    migrate = Migrate(app, db)

    return app


    
