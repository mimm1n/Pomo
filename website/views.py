from flask import Blueprint, render_template, url_for

views = Blueprint('views', __name__ )

@views.route('/', methods=["GET", "[POST]"])
def landing():
    return render_template('base.html')

@views.route('/settings')
def settings():
    return render_template('settings.html')

@views.route('/sign-up')
def sign_up():
    return render_template('sign_up.html')

@views.route('/login')
def login():
    return render_template('login.html')

@views.route('/profile')
def profile():
    return render_template('profile.html')

@views.route('/home')
def home():
    return render_template('home.html')
 