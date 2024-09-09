from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
import re
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   #means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__ )
special_characters = ['#', '@', '!', '%']

@auth.route('/sign-up',  methods=["GET", "[POST]"])
def sign_up():
    if request.method == "POST":
        email = request.form.get("email")
        first_name = request.form.get("firstName")
        last_name = request.form.get("lastName")
        password = request.form.get("password")
        con_password = request.form.get("conPassword")
        
        user = User.query.filter_by(email=email).first()
        
        if user:
            flash('Email already exists.', category='error')
        elif len(email) < 5:
            flash('Email has to be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be more than 1 character.', category='error')
        elif len(last_name) < 2:
            flash('last name must be more than 1 character.', category='error')
        elif len(password) < 8:
            flash('Password has to be at least 6 characters.', category='error')
        elif re.search('special_character',password) is None:
            flash('Your password must have at least 1 special character', category='error')
        elif re.search('[0-9]', password) is None:
             flash('Your password must have at least 1 number', category='error')
        elif re.search('[A-Z]', password) is None:
             flash('Your password must have at least 1 Uppercase', category='error')
        elif password != con_password:
            flash('Passwords do not match.', category='error')
        else:
            new_user = User(email=email, first_name=first_name, last_name=last_name, password=generate_password_hash(
                password, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('views.home')) 
           
    return render_template('sign_up.html', user=current_user)

@auth.route('/login',  methods=["GET", "[POST]"])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    return render_template("login.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))