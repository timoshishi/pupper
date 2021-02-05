# Deploying to Heroku with Auth0 Enabled

### This was a \*!?\*!\*#? **_process_**, an all day process to be precise.

## Getting the project set up

Using
[this](https://auth0.com/blog/complete-guide-to-react-user-authentication/)
guide from Auth0 was very helpful at the start

Issues mostly related to the setting of config variables

- Set config variables in both heroku site as well as in the app

- Locally have config variables in both client .env.local with REACT_APP prefix
  as well as in server side with .env

- Even with the domain env variable set on heroku the app was for some reason
  unable to read it. Hence in `/client/src/auth/auth0-provider-with history` the
  `domain` variable is hardcoded.

- Watch for extra or missing backslashes anywhere that the ENV variables are
  used. They are in no way optional.
  - In `/authz/check-jwt.js` the issuer needs a trailing backslash.
  - Although most ENV variables need slashes at the end the REACT_APP_SERVER
    **DOES NOT TAKE ONE AT THE END** in local as well as in dev.
- Name all env variables the same as they are named in the tutorial. I will
  thank me later for this if I remember to do so.

- Add social provider connections to the app in Auth0

While it is possible to use the dev keys that auth0 provides, you will have to
log in after the page refreshes. Google tokens will stay if the keys are
entered.

- Github: Get from github develelopers. They expect the callback url to look
  like: `https://dev-iuxihd45.us.auth0.com/`
- In the Google API Console create an application and use the
  `+ create credentials` button and select OAuth client. The redirect URI should
  be set as above.
