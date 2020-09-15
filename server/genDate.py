import pickledb
from datetime import datetime
from random import randrange
from datetime import timedelta
import strgen
import datetime as dt

pickdbDate = pickledb.load('gendate.db', False)

def random_date(start, end):
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)

d1 = datetime.strptime('1/1/2008 1:30 PM', '%m/%d/%Y %I:%M %p')
d2 = datetime.strptime('1/1/2009 4:50 AM', '%m/%d/%Y %I:%M %p')



# for i in range(100):
#     ran=strgen.StringGenerator("[\d\w]{10}").render()
#     dt=str(random_date(d1, d2)).replace(" ",",")
#     dc={}
#     dc["origDate"]=dt
#     dc["nextDate"]=dt
#     pickdbDate.set(ran,dc)
#     pickdbDate.dump()

for ele in pickdbDate.getall():
	print(ele)



				
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

