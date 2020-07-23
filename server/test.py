import pyrebase
import pprint
import pickledb
import datetime as dt
from datetime import datetime
import json

import time

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
    "apiKey": "AIzaSyBwk0GjuBX5_ZozvgldtH38FZhY2AhCu34",
    "authDomain": "hospitalusers-44f06.firebaseapp.com",
    "databaseURL": "https://hospitalusers-44f06.firebaseio.com",
    "projectId": "hospitalusers-44f06",
    "storageBucket": "hospitalusers-44f06.appspot.com",
    "messagingSenderId": "1020686800954",
    "appId": "1:1020686800954:web:003ea93c285f06847d3d03"
  }
  
  
# config = {
    # "apiKey": "AIzaSyBzablT_gQoi5HOl5FqZF9LeK1LkruOzKE",
    # "authDomain": "hospitalusers-d3cda.firebaseapp.com",
    # "databaseURL": "https://hospitalusers-d3cda.firebaseio.com",
    # "projectId": "hospitalusers-d3cda",
    # "storageBucket": "hospitalusers-d3cda.appspot.com",
    # "messagingSenderId": "1074652022617",
    # "appId": "1:1074652022617:web:20c1567f52ae88b8b8ae48"
  # }


firebase=pyrebase.initialize_app(config)
storage=firebase.storage()
pp = pprint.PrettyPrinter(indent=4)
db = firebase.database()
pickdbExpo = pickledb.load('example1.db', False)
pickdbDate = pickledb.load('example.db', False)


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
	#print(usrList)

	usrlog=[]
	gloLog=[]

	if pickdbExpo.get("lenOfUsers")<len(usrList) or pickdbExpo.get("lenOfUsers")==False:
		pickdbExpo.set("lenOfUsers",len(usrList))
		pickdbExpo.dump()

		for usr in usrList:
			if usr in pickdbExpo.getall():
				continue
			else:
				#for t in user.val():
				e=user.val()[usr]['ExpoToken']
				l=user.val()[usr]['loginDetails']['time']
				pickdbExpo.set(usr,e)
				pickdbDate.set(usr,l)
				pickdbExpo.dump()
				pickdbDate.dump()

		# print("sleep...........")
		# time.sleep(60)

	elif pickdbExpo.get("lenOfUsers")==len(usrList):
		print("break")

		for ele in pickdbDate.getall():
			
			nowstr=pickdbDate.get(ele).split(" ")[0].split("-")
			nowstr1=pickdbDate.get(ele).split(" ")[1].split(":")
			#print(nowstr,nowstr1)
			nowdt=dt.datetime(int(nowstr[0]), int(nowstr[1]), int(nowstr[2]),int(nowstr1[0]),int(nowstr1[1]),int(nowstr1[2]))
			_30days=dt.timedelta(days=30)
			future_date=nowdt+_30days
			print(nowdt,future_date)
		

	


        

		
		
	# for ele in gloLog:
	# 	print(ele[1])
	# 	nowstr=ele[1][-1]['time'].split(" ")[0].split("-")
	# 	nowstr1=ele[1][-1]['time'].split(" ")[1].split(":")
	# 	print(nowstr1)
	# 	nowdt=dt.datetime(int(nowstr[0]), int(nowstr[1]), int(nowstr[2]),int(nowstr1[0]),int(nowstr1[1]),int(nowstr1[2]))
	# 	_30days=dt.timedelta(days=30)
	# 	_seconds=dt.timedelta(seconds=1)
	# 	future_date=nowdt+_seconds#_30days
	# 	print(future_date)
	# 	print(nowdt==future_date)
	# 	if nowdt==future_date:
	# 		print("tok:  ",pickdb.get(ele[0]))
			
	# 		send_push_message(pickdb.get(ele[0]),"push message")
	# 	else:
	# 		p={}
	# 		f=[]
	# 		p['nowdt']=str(nowdt)
	# 		p['future_date']=str(future_date)
	# 		f.append(p)
			
	# 		pickdbLogin.set(ele[0],p)
	# 	#break
	# pickdb.dump()
	# pickdbLogin.dump()
	

if __name__ == '__main__':
    scheduler.add_job(id ='Scheduled task', func = firstRun, trigger = 'interval', seconds = 10)
    #scheduler.add_job(id ='Scheduled task2', func = secondRun, trigger = 'interval', seconds = 15)
    scheduler.start()
    app.run(host = '0.0.0.0', port = 8080).













	

