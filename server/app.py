# /register -> collect all details and push to firebase
# /login -> get time of login
# /upload -> upload image to fb and get img_url



# import flask
# from flask_cors import CORS, cross_origin
# from flask import request, jsonify

# app = flask.Flask(__name__)
# app.config["DEBUG"] = True
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'


# @app.route('/test', methods=['GET'])
# @cross_origin()
# def home():
# 	k={"msg":"rec"}
# 	return jsonify(k)

# app.run()

import pyrebase

config = {
    "apiKey": "AIzaSyDceb3HgkloqF-q4PrxwH2IOwLnNCCIP-I",
    "authDomain": "hospital-e394d.firebaseapp.com",
    "databaseURL": "https://hospital-e394d.firebaseio.com",
    "projectId": "hospital-e394d",
    "storageBucket": "hospital-e394d.appspot.com",
    "messagingSenderId": "605662291692",
    "appId": "1:605662291692:web:229f22dd31078d218e67c9",
    "measurementId": "G-M7NF81475B"
  }


firebase=pyrebase.initialize_app(config)
storage=firebase.storage()

db = firebase.database()
users = db.child("users").get()
print(users.val())

# path_on_cloud="images2/new2.jpg"
# path_local="/home/bspwm/Pictures/ArcoLinux-2019-09-23-1569250074_screenshot_1366x768.jpg"
# imgurl=storage.child(path_on_cloud).put(path_local)
# img_url=storage.child(path_on_cloud).get_url(imgurl['downloadTokens'])
# print(img_url)