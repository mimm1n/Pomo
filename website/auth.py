from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
import re
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   #means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user



auth = Blueprint('auth', __name__)

special_characters = r'[!@#%]'

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

@auth.route('/forgot_password', methods=["GET", "POST"])
def forgot_password():
    if request.method == "POST":
        email = request.form.get("email")
        username = request.form.get("username")
        password1 = request.form.get('password1')
        con_password = request.form.get("password2")

        user = User.query.filter_by(email=email).first()
        
        if len(password1) < 7:
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

            new_user = User(
                email=email, 
                username=username, 
                password = generate_password_hash(password1, method='sha256')
            )

            db.session.add(new_user)
            db.session.commit()

            login_user(new_user, remember=True)

            flash('New Password Made!', category='success')
            return redirect(url_for('views.home'))
        
    return render_template('forgot_password.html', user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


    
# @auth.route('/profile', methods=['GET', 'POST'])
# @login_required
# def profile():
    
#     form = sign_up(request.form)
#     id = current_user.id
#     name_to_update = User.query.get_or_404(id)
    
#     if request.method == "POST":
#         name_to_update.email = request.form.get['email']
#         name_to_update.username = request.form.get['username']
  
        # if request.files['profile_pic']:# Check for profile pic
            
        #     name_to_update.profile_pic = request.files.get['profile_pic']

		# 	# Grab Image Name
        #     pic_filename = secure_filename(name_to_update.profile_pic.filename)
		# 	# Set UUID
        #     pic_name = str(uuid.uuid1()) + "_" + pic_filename
		# 	# Save That Image
        #     saver = request.files['profile_pic']
			

		# 	# Change it to a string to save to db
        #     name_to_update.profile_pic = pic_name
            
        #     try:
        #         db.session.commit()
        #         saver.save(os.path.join(auth.config['UPLOAD_FOLDER'], pic_name))
        #         flash("User Updated Successfully!")
        #         return render_template("profile.html", 
		# 			form=form,
		# 			name_to_update = name_to_update)
        #     except:
        #         flash("Error!  Looks like there was a problem...try again!")
        #         return render_template("profile.html", 
		# 			form=form,
		# 			name_to_update = name_to_update)
    # else:
    #     db.session.commit()
    #     flash("User Updated Successfully!")
    #     return render_template("profile.html", 
    #         form=form, 
    #         name_to_update = name_to_update)
    # else:
    #     return render_template("pomo.html", 
	# 			form=form,
	# 			name_to_update = name_to_update,
	# 			id = id)
    



