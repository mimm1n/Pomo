from flask import Flask
from os import path
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


db = SQLAlchemy()

def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")

    app.config["SECRET_KEY"] = "W3AR3TH3COD3RS"
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db'
    db.init_app(app)

    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_RECORD_QUERIES"] = True
    
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

    return app






