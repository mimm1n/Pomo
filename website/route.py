from flask import Blueprint, render_template, request, redirect, url_for, flash
from .models import User
from . import db

main = Blueprint('main', __name__)

@main.route('/profile', methods=['GET', 'POST'])
def profile():
    
    user = User.query.get(1) #getting the 1 id to simplyfy it

    if request.method == 'POST':
        new_email = request.form['email']
        new_username = request.form['username']

        # Checks if the new username already exists 
        existing_user = User.query.filter_by(username=new_username).first()
        if existing_user and existing_user.id != user.id:
            flash('Username already taken. Please choose another one.')
            return redirect(url_for('main.profile'))

        # if username is unique, it will update
        user.email = new_email
        user.username = new_username
        db.session.commit()

        flash('Profile updated successfully!')
        return redirect(url_for('main.profile'))

    return render_template('profile.html', user=user)

