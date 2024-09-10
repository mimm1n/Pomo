from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from .models import User
import re
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user
import json
from .models import Note
from . import db


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
                password, method='pbkdf2:sha256'))
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
        password = request.form.get('password1')

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



#experimenting on how to add another note
@auth.route('/',methods=["GET", "[POST]"])
def home():
    if request.method == '[POST]':
        note = request.form.get('note')#Gets the note from the HTML 

        if len(note) < 1:
                flash('Note is too short!', category='error') 
        else:
                new_note = Note(data=note, user_id = current_user.id)  #providing the schema for the note 
                db.session.add(new_note) #adding the note to the database 
                db.session.commit()
                flash('Note added!', category='success')

    return render_template("home.html",user=current_user)


@auth.route('/delete-note',methods=['[POST]'])
def delete_note():  
    note = json.loads(request.data) # this function expects a JSON from the INDEX.js file 
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})
