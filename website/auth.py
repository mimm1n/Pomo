from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from .models import User
# import re
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   #means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

# special_characters = r'[!@#%]'

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get("email")
        username = request.form.get("username")
        password1 = request.form.get("password1")
        con_password = request.form.get("password2")
        
        # Check if the user already exists
        user = User.query.filter_by(email=email).first()
        
        # Form validation
        if user:
            flash('Email already exists.', category='error')
        elif len(email) < 5:
            flash('Email must be greater than 5 characters.', category='error')
        elif len(username) < 2:
            flash('Username must be more than 1 character.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 8 characters.', category='error')
        # elif re.search(special_characters, password) is None:
        #     flash('Your password must have at least 1 special character (@, #, !, %)', category='error')
        # elif re.search(r'[0-9]', password) is None:
        #     flash('Your password must have at least 1 number.', category='error')
        # elif re.search(r'[A-Z]', password) is None:
        #     flash('Your password must have at least 1 uppercase letter.', category='error')
        elif password1 != con_password:
            flash('Passwords do not match.', category='error')
        else:
            # If everything is valid, create the new user
            new_user = User(
                email=email, 
                username=username, 
                password=generate_password_hash(password1, method='sha256')
            )

            db.session.add(new_user)
            db.session.commit()

            login_user(user, remember=True)

            flash('Account created!', category='success')
            return redirect(url_for('views.home'))
    
    # Render the sign-up form
    return render_template('sign_up.html', user=current_user)

@auth.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password1')

        # Fetch user from the database
        user = User.query.filter_by(email=email).first()
        
        if user:
            # Verify the password
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
