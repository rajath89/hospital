import pyrebase
import pprint

config = {
    "apiKey": "AIzaSyBwk0GjuBX5_ZozvgldtH38FZhY2AhCu34",
    "authDomain": "hospitalusers-44f06.firebaseapp.com",
    "databaseURL": "https://hospitalusers-44f06.firebaseio.com",
    "projectId": "hospitalusers-44f06",
    "storageBucket": "hospitalusers-44f06.appspot.com",
    "messagingSenderId": "1020686800954",
    "appId": "1:1020686800954:web:003ea93c285f06847d3d03"
  }

firebase=pyrebase.initialize_app(config)
storage=firebase.storage()
pp = pprint.PrettyPrinter(indent=4)
db = firebase.database()


user = db.child("users").get()
usrList=list(user.val()) # users
pp.pprint(user.val()['rajath23']['ExpoToken'])