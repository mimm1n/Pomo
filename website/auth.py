from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
import re
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   #means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

special_characters = r'[!@#%=+-]'

# ---------------------------------- SIGN UP ----------------------------------

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
        elif re.search(special_characters, password1) is None:
            flash('Your password must have at least 1 special character (@, #, !, %)', category='error')
        elif re.search(r'[0-9]', password1) is None:
            flash('Your password must have at least 1 number.', category='error')
        elif re.search(r'[A-Z]', password1) is None:
            flash('Your password must have at least 1 uppercase letter.', category='error')
        elif password1 != con_password:
            flash('Passwords do not match.', category='error')
        else:
            # If everything is valid, create the new user
            new_user = User(
                email=email, 
                username=username, 
                password=generate_password_hash(password1, method='pbkdf2:sha256')
            )


            db.session.add(new_user)
            db.session.commit()

            login_user(new_user, remember=True)

            flash('Account created!', category='success')
            return redirect(url_for('views.home'))
    
    # Render the sign-up form
    return render_template('sign_up.html', user=current_user)

# ---------------------------------- LOGIN ----------------------------------

@auth.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password1 = request.form.get('password1')

        # Fetch user from the database
        user = User.query.filter_by(username=username).first()
        
        if user:
            # Verify the password
            if check_password_hash(user.password, password1):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)

                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Username does not exist.', category='error')

    return render_template("login.html", user=current_user)

# ---------------------------------- FORGOT PASSWORD ----------------------------------

@auth.route('/forgot_password', methods=["GET", "POST"])
def forgot_password():
    user = User.query.get(1) #getting the 1 id to simplyfy it

    if request.method == 'POST':
        new_password1 = request.form.get("password1")
        newcon_password = request.form.get("password2")

        if user:
            # Verify the password
            if len(new_password1) < 7:
                flash('Password must be at least 8 characters.', category='error')
            elif re.search(special_characters, new_password1) is None:
                flash('Your password must have at least 1 special character (@, #, !, %)', category='error')
            elif re.search(r'[0-9]', new_password1) is None:
                flash('Your password must have at least 1 number.', category='error')
            elif re.search(r'[A-Z]', new_password1) is None:
                flash('Your password must have at least 1 uppercase letter.', category='error')
            elif new_password1 == newcon_password:
                flash('Password updated successfully!', category='success')

                user.password = generate_password_hash(new_password1, method='pbkdf2:sha256')
                db.session.commit()
                login_user(user, remember=True)

                return redirect(url_for('auth.login'))
            else:
                flash('Password do not match, try again.', category='error')
        else:
            flash('Username does not exist.', category='error')

        # existing_user = User.query.filter_by(username=username).first()
    return render_template('forgot_password.html', user=user)



# ---------------------------------- LOGOUT ----------------------------------

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/profile', methods=['GET', 'POST'])
def profile_change():
    
    user = User.query.get(1) #getting the 1 id to simplyfy it

    if request.method == 'POST':
        new_email = request.form['email']
        new_username = request.form['username']

        # Checks if the new username already exists 
        existing_user = User.query.filter_by(username=new_username).first()
        if existing_user and existing_user.id != user.id:
            flash('Username already taken.')
            return redirect(url_for('auth.profile_change'))

        # if username is unique, it will update
        user.email = new_email
        user.username = new_username
        db.session.commit()


        flash('Profile updated successfully!')
        return redirect(url_for('views.profile'))

    return render_template('profile.html', user=user)