from flask import Blueprint

auth = Blueprint('auth', __name__ )


@auth.route('/sign-up')
def signUp():
    return "<p>Testing No.1</p>"


@auth.route('/customisation')
def customisation():
    return "<p>Testing No.2</p>"


@auth.route('/settings')
def settings():
    return "<p>Testing No.3</p>"

    
@auth.route('/logout')
def logout():
    return "<p>Testing No.4</p>"