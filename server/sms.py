# we import the Twilio client from the dependency we just installed
from twilio.rest import Client

# the following line needs your Twilio Account SID and Auth Token
client = Client("AC2ad5605aa7e27b3e67e5c679a9d9eedd", "dc0ea2ab7a2b724b1c95dc23d32d4d89")

# change the "from_" number to your Twilio number and the "to" number
# to the phone number you signed up for Twilio with, or upgrade your
# account to send SMS to any phone number
client.messages.create(to="+918050896653", 
                       from_="+12029145242", 
                       body="Hello from Python!")