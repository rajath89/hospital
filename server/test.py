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



def secRun():
	user = db.child("users").get()
	usrList=list(user.val()) # users


	if pickdbIndExpo.get("lenOfUsers")<len(usrList) or pickdbIndExpo.get("lenOfUsers")==False:
		pickdbIndExpo.set("lenOfUsers",len(usrList))
		pickdbIndExpo.dump()

		for usr in usrList:
			if usr in pickdbIndExpo.getall():
				continue
			else:
				try:
					e=user.val()[usr]['ExpoToken']['expoToken']

				
					pickdbIndExpo.set(usr,e)
				
					pickdbIndExpo.dump()
				except KeyError as ke:
					pickdbIndExpo.set("lenOfUsers",len(usrList)-1)
					pickdbIndExpo.dump()
	if pickdbIndExpo.get("lenOfUsers")>0:
		for i in range(20):
			for ele in pickdbIndExpo.getall():
				if ele=="lenOfUsers":
					continue
				print("sent notf to ",ele,i)
				send_push_message(pickdbIndExpo.get(ele),"push message")


	


		

				

				
			
        
        
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
					pickdbDate.set(usr,l)
					pickdbExpo.dump()
					pickdbDate.dump()

				except KeyError as ke:
					pickdbExpo.set("lenOfUsers",len(usrList)-1)
					pickdbExpo.dump()

		# print("sleep...........")
		# time.sleep(60)

	# elif pickdbExpo.get("lenOfUsers")==len(usrList):
	# 	print("break")
	i=0
	if pickdbExpo.get("lenOfUsers")>0:
		

		for ele in pickdbDate.getall():
			print(ele)

			if ele=="valRead":
				continue

			if pickdbDate.get("valRead")==False:
				nowstr=pickdbDate.get(ele).split(",")[0].split("-")
				nowstr1=pickdbDate.get(ele).split(",")[1].split(":")
				print(nowstr,nowstr1)
				nowdt=dt.datetime(int(nowstr[0]), int(nowstr[1]), int(nowstr[2]),int(nowstr1[0]),int(nowstr1[1]),int(nowstr1[2]))
				_30days=dt.timedelta(days=30)
				_10mins=dt.timedelta(minutes=10)
				#future_date=nowdt+_30days
				future_date=nowdt+_10mins

				nowRealDt = dt.datetime.now()
				print("nowDt",nowdt)
				print("_10mFutured",future_date)
			else:
				nowstr=pickdbDate.get(ele).split(" ")[0].split("-")
				nowstr1=pickdbDate.get(ele).split(" ")[1].split(":")
				print(nowstr,nowstr1)
				nowdt=dt.datetime(int(nowstr[0]), int(nowstr[1]), int(nowstr[2]),int(nowstr1[0]),int(nowstr1[1]),int(nowstr1[2]))
				_30days=dt.timedelta(days=30)
				_10mins=dt.timedelta(minutes=10)
				#future_date=nowdt+_30days
				future_date=nowdt+_10mins

				nowRealDt = dt.datetime.now()
				print("nowDt",nowdt)
				print("_10mFutured",future_date)

		


			if nowRealDt>future_date or nowRealDt==future_date:
				print("send notification to ",ele)
				#set future_date as nowdt
				pickdbDate.set(ele,str(future_date)) 
				#pickdbDate.set("valRead","true") 
				pickdbDate.dump()

		pickdbDate.set("valRead","true") 
		pickdbDate.dump()

		                    






			# fs=str(future_date).split(" ")[0].split("-")

			# print(nowdt,future_date)
			# newFs=dt.datetime(int(fs[0]),int(fs[1]),int(fs[2]))
			# newNowdt=dt.datetime(int(nowstr[0]),int(nowstr[1]),int(nowstr[2]))
			

			# if str(newFs-newNowdt).split(",")[0]=="30 days":
			# 	print("send notification")
			# 	send_push_message(pickdbExpo.get(ele),"push message")

				#set future_date as nowdt
				#pickdbDate.set(ele,str(future_date))  *************
				#pickdbDate.dump()                      ***********
		

	


        

		
		
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
    scheduler.add_job(id ='Scheduled task', func = firstRun, trigger = 'interval', minutes = 3)
    #scheduler.add_job(id ='Scheduled task2', func = secRun, trigger = 'interval', seconds = 15)
    scheduler.start()
    app.run(host = '0.0.0.0', port = 8080)













	

