from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "W3AR3TH3COD3RS"
    
    return app