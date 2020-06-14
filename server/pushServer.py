import pyrebase
import pprint
import pickledb
import datetime as dt
from datetime import datetime
import json

#pip install exponent_server_sdk


from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError

#pip install Flask-APScheduler


from flask import Flask
from flask_apscheduler import APScheduler
from flask_cors import CORS, cross_origin


  
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
pp = pprint.PrettyPrinter(indent=4)
db = firebase.database()
pickdb = pickledb.load('example1.db', False)
pickdbLogin = pickledb.load('example.db', False)


app = Flask(__name__)
scheduler = APScheduler()
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/")
@cross_origin()
def index():
    return "Welcome to the scheduler!"




def myconverter(o):
    if isinstance(o, dt.datetime):
        return o.__str__()
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
        
        
def secondRun():
	uname=pickdbLogin.getall()
	if len(uname)!=0:
		delItems=[]
		print(type(uname))
		for un in uname:
			print(un)
			locVal=pickdbLogin.get(un)
			print(type(locVal))
			for v in locVal:
				#print(list(v))
				print(locVal['nowdt'],locVal['future_date'])
				nt_obj = datetime.strptime(locVal['nowdt'], "%Y-%m-%d %H:%M:%S")
				ft_obj = datetime.strptime(locVal['future_date'], "%Y-%m-%d %H:%M:%S")
			if nt_obj==ft_obj or ft_obj>nt_obj:
				print("tok:  ",pickdb.get(un))
				
				send_push_message(pickdb.get(un),"push message")
				delItems.append(un)
				print(delItems)
		if len(delItems)!=0:
			print("hit")
			for name in delItems:
				pickdbLogin.rem(name)
			pickdbLogin.dump()
				
			
        
        
def firstRun():
	user = db.child("users").get()
	usrList=list(user.val()) # users


	#set len of users
	pickdb.set("lenOfUsers",len(usrList))
	usrlog=[]
	gloLog=[]
        
	for usr in usrList:

		usersLogin = db.child("users").child(usr).child("loginDetails").get()
		usersExToken = db.child("users").child(usr).child("ExpoToken").get()

		for i in usersLogin.val():
			#print(usr,usersLogin.val()[i])
			usrlog.append(usersLogin.val()[i])
		for j in usersExToken.val():
			#print(usr,type(usersExToken.val()[j]))
			pickdb.set(usr, usersExToken.val()[j])
		f=usrlog.copy()
		gloLog.append((usr,f))
		usrlog.clear()
		
		
	for ele in gloLog:
		print(ele[1])
		nowstr=ele[1][-1]['time'].split(" ")[0].split("-")
		nowstr1=ele[1][-1]['time'].split(" ")[1].split(":")
		print(nowstr1)
		nowdt=dt.datetime(int(nowstr[0]), int(nowstr[1]), int(nowstr[2]),int(nowstr1[0]),int(nowstr1[1]),int(nowstr1[2]))
		_30days=dt.timedelta(days=30)
		_seconds=dt.timedelta(seconds=1)
		future_date=nowdt+_seconds#_30days
		print(future_date)
		print(nowdt==future_date)
		if nowdt==future_date:
			print("tok:  ",pickdb.get(ele[0]))
			
			send_push_message(pickdb.get(ele[0]),"push message")
		else:
			p={}
			f=[]
			p['nowdt']=str(nowdt)
			p['future_date']=str(future_date)
			f.append(p)
			
			pickdbLogin.set(ele[0],p)
		#break
	pickdb.dump()
	pickdbLogin.dump()
	

if __name__ == '__main__':
    scheduler.add_job(id ='Scheduled task', func = firstRun, trigger = 'interval', seconds = 60)
    scheduler.add_job(id ='Scheduled task2', func = secondRun, trigger = 'interval', seconds = 15)
    scheduler.start()
    app.run(host = '0.0.0.0', port = 8080)




















#print(usrlog)
#print(gloLog[0][1][-1]['time'].split(" ")[0])
#print(gloLog)

#store login time of user
#for j in gloLog:
	#print(j[0],j[1])
	#pickdb.set(j[0], j[1])


#for i in gloLog[0][1]:
	#print(i['time'].split(" ")[0].split("-"))
		
		



###future datetime

# nowstr=gloLog[0][1][-1]['time'].split(" ")[0].split("-")
# nowstr1=gloLog[0][1][-1]['time'].split(" ")[1].split(":")
# print(nowstr1)
# nowdt=dt.datetime(int(nowstr[0]), int(nowstr[1]), int(nowstr[2]),int(nowstr1[0]),int(nowstr1[1]),int(nowstr1[2]))
# _30days=dt.timedelta(days=30)
# _seconds=dt.timedelta(seconds=5)
# future_date=nowdt+_seconds#_30days
# print(future_date)
# print(nowdt==future_date)
	






























#users = db.child("users").get()

#if users.val() is not None:
	# import pprint 
	# pp = pprint.PrettyPrinter(indent=4)
	# #pp.pprint(list(dict(users.val())))
	# c=list(dict(users.val()))
	# all_user_ids = db.child("users").shallow().get()
	# #print(all_user_ids)
	# #for user in users.each():
		# #pp.pprint(user.key()) # Morty
	# a=[]
	# for c1 in c:
		# #print(c1)
		# try:
			# a.append((c1,list(users.val()[str(c1)]['ExpoToken'])))
		# except KeyError:
			# print("keyerr")
	# t=users.val()['vv']['loginDetails'] # {name": "Mortimer 'Morty' Smith"}
	# #print(type(t))
	# print(a[0])
	#for c1 in c:
		#pp.pprint(users.val().keys())
	#with open("file_ou.txt", "w") as fout:
	#	fout.write(pprint.pformat(users.val()))
	#f=list(dict(users.val()))
	#print(type(dict(users.val())[f[0]]))
	



#for f1 in f:
	#print(list(dict(users.val())[f1])) 
