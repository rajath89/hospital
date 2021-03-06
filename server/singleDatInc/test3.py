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
from flask import request, jsonify

import psutil

from hurry.filesize import size

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
#     "apiKey": "AIzaSyBzablT_gQoi5HOl5FqZF9LeK1LkruOzKE",
#     "authDomain": "hospitalusers-d3cda.firebaseapp.com",
#     "databaseURL": "https://hospitalusers-d3cda.firebaseio.com",
#     "projectId": "hospitalusers-d3cda",
#     "storageBucket": "hospitalusers-d3cda.appspot.com",
#     "messagingSenderId": "1074652022617",
#     "appId": "1:1074652022617:web:20c1567f52ae88b8b8ae48"
#   }


firebase=pyrebase.initialize_app(config)
storage=firebase.storage()
pp = pprint.PrettyPrinter(indent=4)
db = firebase.database()
pickdbExpo = pickledb.load('expoFirst.db', False)
pickdbDate = pickledb.load('date.db', False)
pickdbIndExpo = pickledb.load('expoSecond.db', False)


app = Flask(__name__)
scheduler = APScheduler()
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/")
@cross_origin()
def index():
    return "Welcome to the scheduler!"


@app.route("/getSysInfo", methods=['GET'])
@cross_origin()
def index2():
	f=dict(psutil.virtual_memory()._asdict())
	d={}

	for ele in f:
		if ele=="total" or ele=="available" or ele=="active":
			d[ele]=size(f[ele])
		elif ele=="percent":
			d[ele+" of used mem"]=f[ele]

	d["percentage of available mem"]=psutil.virtual_memory().available * 100 / psutil.virtual_memory().total
	#print(d)
	return jsonify(d)




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
        




def secRun():
	user = db.child("users").get()
	usrList=list(user.val()) # users

	if pickdbDate.get("valRead")=="true":

			for ele in pickdbDate.getall():
				print(ele)

				if ele=="valRead":
					continue

				
				nowstr=pickdbDate.get(ele)["origDate"]
					


				nowstr2=pickdbDate.get(ele)["nextDate"].split(",")[0].split("-")
				nowstr2i=pickdbDate.get(ele)["nextDate"].split(",")[1].split(":")
				_1day=dt.timedelta(days=1)
				#future_date=nowstr2+_1day
					
				
				
				nowdt2=dt.datetime(int(nowstr2[0]), int(nowstr2[1]), int(nowstr2[2]),int(nowstr2i[0]), int(nowstr2i[1]), int(nowstr2i[2]))
				future_date=nowdt2+_1day
				
				print("orig",nowstr)
				print("next date",future_date)
				print("setting next date")
				r=str(future_date)
				res=r.replace(" ",",")
				dc={}
				dc["origDate"]=nowstr
				dc["nextDate"]=res
				pickdbDate.set(ele,dc)
				pickdbDate.dump()
		


	# if pickdbIndExpo.get("lenOfUsers")<len(usrList) or pickdbIndExpo.get("lenOfUsers")==False:
	# 	pickdbIndExpo.set("lenOfUsers",len(usrList))
	# 	pickdbIndExpo.dump()

	# 	for usr in usrList:
	# 		if usr in pickdbIndExpo.getall():
	# 			continue
	# 		else:
	# 			try:
	# 				e=user.val()[usr]['ExpoToken']['expoToken']

				
	# 				pickdbIndExpo.set(usr,e)
				
	# 				pickdbIndExpo.dump()
	# 			except KeyError as ke:
	# 				pickdbIndExpo.set("lenOfUsers",len(usrList)-1)
	# 				pickdbIndExpo.dump()
	# if pickdbIndExpo.get("lenOfUsers")>0:
	# 	for i in range(20):
	# 		for ele in pickdbIndExpo.getall():
	# 			if ele=="lenOfUsers":
	# 				continue
	# 			print("sent notf to ",ele,i)
	# 			send_push_message(pickdbIndExpo.get(ele),"push message")


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
				try:
					e=user.val()[usr]['ExpoToken']['expoToken']
					l=user.val()[usr]['time']
					pickdbExpo.set(usr,e)
					d={}
					d["origDate"]=l
					d["nextDate"]=l
					pickdbDate.set(usr,d)
					pickdbExpo.dump()
					pickdbDate.dump()

				except KeyError as ke:
					pickdbExpo.set("lenOfUsers",len(usrList)-1)
					pickdbExpo.dump()

	i=0
	if pickdbExpo.get("lenOfUsers")>0:
		

		for ele in pickdbDate.getall():
			print(ele)

			if ele=="valRead":
				continue

			
			nowstr=pickdbDate.get(ele)["origDate"].split(",")[0].split("-")
			#nowstr_2i=pickdbDate.get(ele)["origDate"].split(",")[1].split(":")
				


			nowstr2=pickdbDate.get(ele)["nextDate"].split(",")[0].split("-")
			nowstr2i=pickdbDate.get(ele)["nextDate"].split(",")[1].split(":")
				
			print(nowstr,nowstr2)
			nowdt=dt.datetime(int(nowstr[0]), int(nowstr[1]), int(nowstr[2]))
			nowdt2=dt.datetime(int(nowstr2[0]), int(nowstr2[1]), int(nowstr2[2]))
			t6=nowdt2-nowdt
			d=str(t6).split(",")[0]
			print("diff",nowdt2-nowdt)

			if d=="30 days" or d=="31 days":
				print("send notification")
				nowdt2i_nextDate=dt.datetime(int(nowstr2[0]), int(nowstr2[1]), int(nowstr2[2]),int(nowstr2i[0]), int(nowstr2i[1]), int(nowstr2i[2]))
				_str=str(nowdt2i_nextDate).replace(" ",",")
				nxt_dc={}
				nxt_dc["origDate"]=_str
				nxt_dc["nextDate"]=_str
				pickdbDate.set(ele,nxt_dc)



		




		pickdbDate.set("valRead","true") 
		pickdbDate.dump()

		                    

	

if __name__ == '__main__':
    scheduler.add_job(id ='Scheduled task', func = firstRun, trigger = 'interval', seconds=30)
    scheduler.add_job(id ='Scheduled task2', func = secRun, trigger = 'interval', seconds = 60)
    scheduler.start()
    app.run(host = '0.0.0.0', port = 8080)













	

