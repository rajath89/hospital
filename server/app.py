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



import flask
from flask_cors import CORS, cross_origin
from flask import request, jsonify

from flask_apscheduler import APScheduler #pip install Flask-APScheduler

app = flask.Flask(__name__)
scheduler = APScheduler()
app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'




def scheduledTask():
    print("This task is running every 5sec")


@app.route('/test', methods=['GET'])
@cross_origin()
def home():
	k={"msg":"rec"}
	return jsonify(k)


@app.route('/login', methods=['GET','POST'])
@cross_origin()
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
		db.child("users").child(uName.split("@")[0]).child("loginDetails").push(k1)

	return jsonify({"login":"success"})



@app.route('/register', methods=['GET','POST'])
@cross_origin()
def register():
	if request.method == "POST":
		#k=request.data
		k1=request.json

		uName=k1["username"]

		tok=k1["expoToken"]

		del k1["expoToken"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).child("RegisterDetails").push(k1)
		db.child("users").child(uName.split("@")[0]).child("ExpoToken").push(tok)

	return jsonify({"register":"success"})

@app.route('/updatePro', methods=['GET','POST'])
@cross_origin()
def updatePro():
	if request.method == "POST":
		#k=request.data
		k1=request.json

		uName=k1["username"]



		del k1["username"]

		db.child("users").child(uName.split("@")[0]).child("ProfileDetails").push(k1)


	return jsonify({"UpdateProfile":"success"})



@app.route('/questions', methods=['GET','POST'])
@cross_origin()
def questions():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).child("questions").push(k1)

	return jsonify({"questions":"success"})


@app.route('/getProfile', methods=['GET','POST'])
@cross_origin()
def getRegister():

	#fdict={}
	if request.method == "POST":
		k1=request.json
		uName=k1["username"]

		del k1["username"]




		users = db.child("users").child(uName.split("@")[0]).child("ProfileDetails").get()
		#print(users.val())

		if users.val() is not None:

			#pp.pprint(list(dict(users.val())))
			#print(users.val())
			f=list(dict(users.val()))
			fD=dict(users.val())[f[0]]

			return jsonify(fD)

		else:
			return jsonify({"msg":"user not yet registerd"})


@app.route('/CAGdetails', methods=['GET','POST'])
@cross_origin()
def CAGdetails():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).child("CAG_ReportDetails").push(k1)

	return jsonify({"cagDetails":"success"})

@app.route('/comments', methods=['GET','POST'])
@cross_origin()
def comments():
	if request.method == "POST":
		#k=request.data
		k1=request.json
		
		uName=k1["username"]

		del k1["username"]

		db.child("users").child(uName.split("@")[0]).child("comments").push(k1)

	return jsonify({"comments":"success"})



if __name__ == '__main__':
    #scheduler.add_job(id ='Scheduled task', func = scheduledTask, trigger = 'interval', seconds=5)#hours = 1
    #scheduler.start()
    app.run()





