from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

db = SQLAlchemy()
DB_NAME = "database.db" 

def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config["SECRET_KEY"] = "W3AR3TH3COD3RS"
    
    
    db = SQLAlchemy(app)
    
    #db.init_app(app)
    
    
    from .route import main
    app.register_blueprint(main)
    
    
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

    
