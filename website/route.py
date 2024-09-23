from flask import Blueprint, render_template, request, redirect, url_for, flash
from .models import User
from . import db

main = Blueprint('main', __name__)

@main.route('/profile', methods=['GET', 'POST'])
def profile():

    user = User.query.get(1)  #make it simple we use user id 1


    if request.method == 'POST':
        new_email = request.form['email']
        new_username = request.form['username']

        # Update user info
        user.email = new_email
        user.username = new_username
        db.session.commit()

        flash('Profile updated successfully!')
        return redirect(url_for('main.profile'))

    return render_template('profile.html', user=user)
