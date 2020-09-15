import pyrebase

#gunicorn==19.0.0

  
# config = {
#     "apiKey": "AIzaSyBwk0GjuBX5_ZozvgldtH38FZhY2AhCu34",
#     "authDomain": "hospitalusers-44f06.firebaseapp.com",
#     "databaseURL": "https://hospitalusers-44f06.firebaseio.com",
#     "projectId": "hospitalusers-44f06",
#     "storageBucket": "hospitalusers-44f06.appspot.com",
#     "messagingSenderId": "1020686800954",
#     "appId": "1:1020686800954:web:003ea93c285f06847d3d03"
#   }
  
 #prod
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
storage=firebase.storage()

db = firebase.database()



import flask
from flask_cors import CORS, cross_origin
from flask import request, jsonify
import flask_profiler

from flask_apscheduler import APScheduler #pip install Flask-APScheduler

from datetime import datetime

app = flask.Flask(__name__)
scheduler = APScheduler()
app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#pip install exponent_server_sdk
from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError


#app.config["DEBUG"] = True

app.config["flask_profiler"] = {
    "enabled": app.config["DEBUG"],
    "storage": {
        "engine": "sqlite"
    },
    "basicAuth":{
        "enabled": True,
        "username": "admin",
        "password": "admin"
    },
    "ignore": [
        "^/static/.*"
    ]
}

flask_profiler.init_app(app)




def scheduledTask():
    print("This task is running every 5sec")

def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
    except PushServerError as exc:
        
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'errors': exc.errors,
                'response_data': exc.response_data,
            })
        raise
    except (ConnectionError, HTTPError) as exc:

        rollbar.report_exc_info(
            extra_data={'token': token, 'message': message, 'extra': extra})
        raise self.retry(exc=exc)

    try:

        response.validate_response()
    except DeviceNotRegisteredError:
        # Mark the push token as inactive
        from notifications.models import PushToken
        PushToken.objects.filter(token=token).update(active=False)
    except PushResponseError as exc:
       
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'push_response': exc.push_response._asdict(),
            })
        raise self.retry(exc=exc)

    return response


@app.route('/test', methods=['GET'])
@cross_origin()
@flask_profiler.profile()
def home():
	now = datetime.now()
 
	print("now =", now)

	# dd/mm/YY H:M:S
	dt_string = now.strftime("%d-%m-%Y %H:%M:%S")
	print("date and time =", dt_string)	
	k={"msg":"rec","date":dt_string,"now":now}
	return jsonify(k)


@app.route('/login', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def login():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		print(k1.keys())
		uName=k1["username"]

		del k1["username"]
		#print(type(k1["username"]),k1["time"])
		# st=str(k.decode("utf-8"))
		#lt={"loginINfo":k1["time"]}
		db.child("users").child(uName.split("@")[0]).update(k1)

	return jsonify({"login":"success"})



@app.route('/register', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def register():
	if request.method == "POST":
		#k=request.data
		k1=request.json

		uName=k1["username"]

		tok=k1["expoToken"]

		del k1["expoToken"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).child("RegisterDetails").update(k1)
		db.child("users").child(uName.split("@")[0]).child("ExpoToken").update(tok)

	return jsonify({"register":"success"})

@app.route('/updatePro', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def updatePro():
	if request.method == "POST":
		#k=request.data
		k1=request.json

		uName=k1["username"]



		del k1["username"]

		db.child("users").child(uName.split("@")[0]).update(k1)


	return jsonify({"UpdateProfile":"success"})



@app.route('/questions', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def questions():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).update(k1)

	return jsonify({"questions":"success"})


# @app.route('/getProfile', methods=['GET','POST'])
# @cross_origin()
# def getRegister():

# 	#fdict={}
# 	if request.method == "POST":
# 		k1=request.json
# 		uName=k1["username"]

# 		del k1["username"]




# 		users = db.child("users").child(uName.split("@")[0]).child("ProfileDetails").get()
# 		#print(users.val())

# 		if users.val() is not None:

# 			#pp.pprint(list(dict(users.val())))
# 			#print(users.val())
# 			f=list(dict(users.val()))
# 			fD=dict(users.val())[f[0]]

# 			return jsonify(fD)

# 		else:
# 			return jsonify({"msg":"user not yet registerd"})



# @app.route('/getProfile', methods=['GET','POST'])
# @cross_origin()
# def getRegister():

# 	#fdict={}
# 	if request.method == "POST":
# 		k1=request.json
# 		uName=k1["username"]

# 		del k1["username"]



# 		user = db.child("users").get()
# 		#users = db.child("users").child(uName.split("@")[0]).child("ProfileDet").get()
# 		#print(user.val()['rajath']['ProfileDet'])

# 		if user.val() is not None:

# 			#pp.pprint(list(dict(users.val())))
# 			#print(users.val())
# 			# f=list(dict(users.val()))
# 			# fD=dict(users.val())[f[0]]

# 			return jsonify(user.val()[uName.split("@")[0]]['ProfileDet'])

# 		else:
# 			return jsonify({"msg":"user not yet registerd"})



@app.route('/CAGdetails', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def CAGdetails():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).update(k1)

	return jsonify({"cagDetails":"success"})
	
@app.route('/comments', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def comments():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).update(k1)

	return jsonify({"comments":"success"})


@app.route('/BPvalues', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def BP():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).update(k1)

	return jsonify({"BPvalues":"success"})




@app.route('/addType', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def addtype():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).child("Type").update(k1)

	return jsonify({"report_type":"success"})


@app.route('/BMI', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def bmi():
	if request.method == "POST":
		#k=request.data
		k1=request.json

		uName=k1["username"]



		del k1["username"]


		db.child("users").child(uName.split("@")[0]).child("ProfileDet").update(k1)


	return jsonify({"BMI":"success"})


@app.route('/expo', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def expo():
	if request.method == "POST":
		#k=request.data
		k1=request.json

		uName=k1["username"]

		tok=k1["expoToken"]

		#del k1["expoToken"]

		del k1["username"]

		#db.child("users").child(uName.split("@")[0]).child("RegisterDetails").push(k1)
		db.child("users").child(uName.split("@")[0]).child("ExpoToken").update(k1)

	return jsonify({"expo":"success"})


# @app.route('/getDocComment', methods=['GET','POST'])
# @cross_origin()
# def doccomments():

# 	#fdict={}
# 	if request.method == "POST":
# 		k1=request.json
# 		uName=k1["username"]

# 		del k1["username"]



# 		user = db.child("users").get()
# 		#users = db.child("users").child(uName.split("@")[0]).child("ProfileDet").get()
# 		#print(user.val()['rajath']['ProfileDet'])

# 		if user.val() is not None:

# 			#pp.pprint(list(dict(users.val())))
# 			#print(users.val())
# 			# f=list(dict(users.val()))
# 			# fD=dict(users.val())[f[0]]

# 			return jsonify(user.val()[uName.split("@")[0]]['doctorsComments'])
# 			#return jsonify(user.val()[uName.split("@")[0]]['time'])

# 		else:
# 			return jsonify({"msg":"no comments"})

@app.route('/getDocComment', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def doccomments():

	#fdict={}
	if request.method == "POST":
		k1=request.json
		uName=k1["username"]

		del k1["username"]



		user = db.child("users").get()


		try:
			obj=user.val()[uName.split("@")[0]]['doctorsComments']
			print(obj)
			if obj=="none":
				return jsonify({"msg":"no comments"})
			else:
				return jsonify({"comment": user.val()[uName.split("@")[0]]['doctorsComments']})
		except KeyError:
			return jsonify({"msg":"error"})


@app.route('/getProfile', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def getRegister():

	#fdict={}
	if request.method == "POST":
		k1=request.json
		uName=k1["username"]

		del k1["username"]



		user = db.child("users").get()



		try:
			return jsonify(user.val()[uName.split("@")[0]]['ProfileDet'])

		except KeyError:
			return jsonify({"msg":"user not yet registerd"})

@app.route('/sendNotification', methods=['GET','POST'])
@cross_origin()
@flask_profiler.profile()
def sendNot():

	#fdict={}
	if request.method == "POST":
		k1=request.json
		uName=k1["username"]

		del k1["username"]



		user = db.child("users").get()



		try:
			token=user.val()[uName.split("@")[0]]['ExpoToken']['expoToken']
			resp=send_push_message(token,"push message python")
			return jsonify({"server response":resp})
		except KeyError:
			return jsonify({"msg":"no expotoken to fetch"})



if __name__ == '__main__':
    #scheduler.add_job(id ='Scheduled task', func = scheduledTask, trigger = 'interval', seconds=5)#hours = 1
    #scheduler.start()
    app.run()





