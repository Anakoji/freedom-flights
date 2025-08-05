# Freedom-flights
This is a travel agency with amadeus with a regisitration system and login system.
In Mysql the phoneNumber column takes numbers as an int thats why it may throw errors to fix it change phoneNumber column from into to varchar(25), that should give you enough space to store numbers.

When you first download.

Create your .env file and put in your api key like this.

API_KEY = "Key here"
API_KEY_SECRET = 'Secret here'

you can get amadeus api key from 

https://developers.amadeus.com/

Do an npm install 

and to run the script

do npm run dev
