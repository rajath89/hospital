import pyrebase
import pprint

config = {
    "apiKey": "AIzaSyBzablT_gQoi5HOl5FqZF9LeK1LkruOzKE",
    "authDomain": "hospitalusers-d3cda.firebaseapp.com",
    "databaseURL": "https://hospitalusers-d3cda.firebaseio.com",
    "projectId": "hospitalusers-d3cda",
    "storageBucket": "hospitalusers-d3cda.appspot.com",
    "messagingSenderId": "1074652022617",
    "appId": "1:1074652022617:web:20c1567f52ae88b8b8ae48"
  }

firebase=pyrebase.initialize_app(config)
# storage=firebase.storage()
pp = pprint.PrettyPrinter(indent=4)
db = firebase.database()



user = db.child("users").get()


usrList=list(user.val()) # users
pp.pprint(user.val()['rajath']['ExpoToken'])
pp.pprint(user.val()['rajath']['time'])