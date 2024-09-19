from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from . import db
import json
from . import views
from .models import User




views = Blueprint('views', __name__ )

@views.route("/")
def landing():
    return render_template('base.html', user=current_user)

@views.route('/settings')
def settings():
    return render_template('settings.html', user=current_user)

@views.route('/profile')
def profile():
    return render_template('profile.html', user=current_user)

@views.route('/home')
def home():
    return render_template('pomo.html', user=current_user)
 
@views.route('/game')
def game():
    return render_template('game.html', user=current_user)

@views.route('/user/<username>', user=current_user)
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('user.html', user=user)

