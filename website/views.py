from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from . import db
import json

views = Blueprint('views', __name__ )

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

@views.route('/')
def home():
    return render_template('home.html')
 
@views.route('/game')
def game():
    return render_template('game.html')
