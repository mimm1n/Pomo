# from flask import Blueprint, render_template, request, redirect, url_for, flash
# from .models import User
# from . import db

# main = Blueprint('main', __name__)

# @main.route('/profile', methods=['GET', 'POST'])
# def profile():
    
#     user = User.query.get(1) #getting the 1 id to simplyfy it

#     if request.method == 'POST':
#         new_email = request.form['email']
#         new_username = request.form['username']

#         # Checks if the new username already exists 
#         existing_user = User.query.filter_by(username=new_username).first()
#         if existing_user and existing_user.id != user.id:
#             flash('Username already taken. Please choose another one.')
#             return redirect(url_for('main.profile'))

#         # if username is unique, it will update
#         user.email = new_email
#         user.username = new_username
#         db.session.commit()


#         flash('Profile updated successfully!')
#         return redirect(url_for('main.profile'))

#     return render_template('profile.html', user=user)

# @main.route('/forgot_password', methods=['GET', 'POST'])
# def forgotpass():
    
#     user = User.query.get(1) #getting the 1 id to simplyfy it
#     existing_user = User.query.filter_by(username=username).first()

#     if request.method == 'POST':
#         username = request.form['username']
#         new_password1 = request.form['password1']
#         con_password2 = request.form['password2']

#         if new_password1 != con_password2:
#             flash('Passwords do not match.', category='error')
#         elif existing_user != username:
#             flash('Username does not exist!')
#         else:
#             user.password1 = generate_password_hash(new_password1, method='pbkdf2:sha256')
#             db.session.commit()

#         flash('Password updated successfully!')
#         return redirect(url_for('views.login'))

#     return render_template('forgot_password.html', user=user)
