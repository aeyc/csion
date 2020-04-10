import pycurl
from io import BytesIO
from urllib.parse import urlencode
import requests
>>> from requests_oauthlib import OAuth1

###### GET ########
b_obj = BytesIO()
crl = pycurl.Curl()

# Set URL value
crl.setopt(crl.URL, 'https://wiki.python.org/moin/BeginnersGuide')
crl.setopt(crl.SSL_VERIFYHOST, 0)
crl.setopt(crl.SSL_VERIFYPEER, 0)

# Write bytes that are utf-8 encoded
crl.setopt(crl.WRITEDATA, b_obj)

# Perform a file transfer
crl.perform()

# End curl session
crl.close()

# Get the content stored in the BytesIO object (in byte characters)
get_body = b_obj.getvalue()

print('Output of GET request:\n%s' % get_body.decode('utf8'))


###### POST ########

crl = pycurl.Curl()
crl.setopt(crl.URL, 'https://www.code-learner.com/post/')
data = {'field': 'value'}
pf = urlencode(data)

# Sets request method to POST,
# Content-Type header to application/x-www-form-urlencoded
# and data to send in request body.
crl.setopt(crl.POSTFIELDS, pf)
crl.perform()
crl.close()

crl.head
#######################

crl.setopt(crl.header, 0)

response = requests.get(
    'https://gateway-lon.watsonplatform.net/natural-language-understanding/api',
    params={'u': 'apikey:{apikey}',},
    headers={'Content-Type': 'application/json'},
)



auth1 = ("apikey","7LNEjCMvP6ZcNShjAkjPob7QSCfIHeZMQkn4Ho3dQgte")



headers = {'content-type': 'application/json'}

features = {"sentiment": {},"categories": {},"concepts": {},"entities": {},"keywords": {}}

myData ={
    "url": "http://newsroom.ibm.com/Guerbet-and-IBM-Watson-Health-Announce-Strategic-Partnership-for-Artificial-Intelligence-in-Medical-Imaging-Liver",
    "features": features
 }

d = requests.post(
                auth=auth1,
                headers=headers,
                data=myData,
                url='https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12'
            )
d





#####################################################
#####################################################
curl -X POST -u "apikey:{apikey}" \
--header "Content-Type: application/json" \
--data '{
  "url": "http://newsroom.ibm.com/Guerbet-and-IBM-Watson-Health-Announce-Strategic-Partnership-for-Artificial-Intelligence-in-Medical-Imaging-Liver",
  "features": {
    "sentiment": {},
    "categories": {},
    "concepts": {},
    "entities": {},
    "keywords": {}
  }
}' \
"https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12"
