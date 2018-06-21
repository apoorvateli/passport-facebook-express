This project demonstrates how to use Express 4.x and Passport to authenticate users using Facebook. 

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

This project uses environment variables to configure the consumer key and
consumer secret needed to access Facebook's API.  Start the server with those
variables set to the appropriate credentials.

```bash
CLIENT_ID=__FACEBOOK_CLIENT_ID__ 
CLIENT_SECRET=__FACEBOOK_CLIENT_SECRET__ 
node server.js
```  
To get these credentials, assuming you have a Facebook account, head over to https://developers.facebook.com/.    
In the upper right hand corner will be a “My Apps” button — click it to add a new app.  
After entering a Captcha, on the next page, click Add Product.  
The product you want is Facebook Login.  
For platform, select WWW.  
You’ll then be prompted to enter information about your site.  
You do not have to have a site in production yet. You can absolutely use localhost for your values.  
For the first prompt, use http://localhost:3000 as thats what this Express app uses.  
Skip the rest of the panels, and when done, click the new “Settings” link under the Facebook Login group in the left hand menu.  
On the settings page, there’s one important setting called “Valid OAuth redirect URIs”. You need to tell Facebook where a user is allowed to be redirected back to after authorization. Again, you can use localhost for this. This project uses http://localhost:3000/auth/facebook/return.   
Make sure you click Save. Then go to the main Settings link in the left hand nav (towards the top) and you’ll see an App ID and App Secret field. These are the credentials required to run the project. Set these credentials as environment variables as mentioned above.

Open a web browser and navigate to [http://localhost:3000/](http://localhost:3000/)
to see the web app in action.
