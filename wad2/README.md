# Assignment 2 - Web API.

Name: Dimitri Saridakis

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
All features in this API are either completely new or have been rewritten as my API is a custom API that is based on my 'freeTable' bar/ restaurant booking management system. 
 
 + Feature 1 - Complete CRUD capabilities:
 + With POST routes for registering new User, Authentication of User, Addition of new tables.
 + DELETE route for the deletion of Table from database by ID
 + PUT route for the updating of User details
 + GET route for getting list of all tables in database
 + Feature 2 - Protected routes using Passport
 + Feature 3 - Custom Mongoose validation using regex to make sure emails are in the correct xxx@xxx.xxx
 + Feature 4 - More custom validation for User's privilege level ( must be within 0 - 3 range )
 + Feature 4 - Error handling for incorrect route input
 + Feature 5 - All errors returned as json with full stack trace
 + Feature 6 - All mongoose validation has custom error messages displaying where and why the validation failed
 + Feature 7 - Further Authentication based on level of privilege. Admin privilege level allows for creation of tables. Takes the form of a function so one can add in the function into any route they want to protect with admin privileges.
 + Feature 8 - Mongo database is hosted on AWS via Atlas. Every query queries the database live.

## Installation Requirements



To install simply:

```bat
git clone https://github.com/dimakis/tableFreeAPI.git

```

followed by installation

```bat
npm install 
```

and then to run
```bat
npm start

```
## API Configuration

Will share the .env in file to recturer
```bat
NODE_ENV=development
PORT=8088
```


## API Design
Routes in the API 

GET /tables
DELETE /deletetable/:id
POST /addtable
POST /auth/login
POST /auth/login?action=register
PUT /:id


## Security and Authentication
Passport, JWT tokens used for authorisation and private routes. 
Custom functions providing 'Admin' access to create table - can be resused for any route
All routes that involve access to tables need JWT token to access

## Integrating with React App

Login and GET tables integrated with React app. They are the only 2 functional calls to API in the app. 
~~~Javascript

const handleFormSubmit = async (event) => {
    event.preventDefault();
    setData({
      data: { ...data },
      isSubmitting: true,
      errorMessage: null
    });
    let id = data.email
    const token = Buffer.from(`${data.email}:${data.password}`, 'utf8').toString('base64')
    await fetch("http://localhost:8088/auth/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ` //${token}`
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
      .then(res => {
        return res = res.json();
      })
      // .then(console.log('@login, res.json: ' + res))
      .then(res => {
        dispatch({
          type: "LOGIN",
          payload: res
        })
      })

      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
    return (
      props.history.push('/home/')
    )
  };

  // this function gets the tables
const FetchTables = () => {
        const tokenA = localStorage.getItem('token')
        const token = tokenA.slice(1, -1)
        React.useEffect(() => {
            dispatch({
                type: "FETCH_TABLES_REQUEST"
            });
            fetch("http://localhost:8088/tables", {
                method:'GET',
                // the reason I can do leave out the localhost is I designated port 3030 as a proxy
                // fetch("/tables/", {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    return res = res.json();
                })
                .then(resJson => {
                    console.log(resJson);
                    console.log("fetch table success")
                    dispatch({
                        type: "FETCH_TABLES_SUCCESS",
                        payload: resJson
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: "FETCH_TABLES_FAILURE"
                    });
                });
        }, []);
    }
~~~

## Independent learning.

I started going down the road of Open Connect and using a https connection, that didn't work as Caddy would not reverse proxy as there was already processes running on 443.
I researched Mongoose and MongoDB Aggregation pipeline and its use with Express - I have the aggregations successfully tested in with Mongo but didn't get time to implement into API

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  

## References:

https://zellwk.com/blog/async-await-express/
https://medium.com/@SigniorGratiano/express-error-handling-674bfdd86139
https://stackoverflow.com/questions/61862598/passport-js-admin-user-verification/61881181#61881181
https://www.robinwieruch.de/node-express-error-handling
https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
https://chanwingkeihaha.medium.com/validation-in-mongoose-where-how-and-handle-errors-b44f68cccae3
https://expressjs.com/en/guide/error-handling.html
https://levelup.gitconnected.com/handling-errors-in-mongoose-express-for-display-in-react-d966287f573b
https://stackoverflow.com/questions/18551519/error-handling-under-mongoose-save
https://medium.com/javascript-in-plain-english/store-clean-data-by-validating-models-with-mongoose-f6453dbdbff9
https://kb.objectrocket.com/mongo-db/how-to-use-mongoose-custom-validators-923
https://stackoverflow.com/questions/34399118/how-to-validate-email-in-mongoose/34399228
https://stackoverflow.com/questions/63783612/mongoose-async-custom-validation-not-working-as-expected
https://auth0.com/blog/browser-behavior-changes-what-developers-need-to-know/
https://auth0.com/blog/complete-guide-to-nodejs-express-user-authentication/
https://auth0.com/docs/libraries/secure-local-development
https://medium.com/javascript-in-plain-english/responsive-web-design-bootstrap-node-js-auth0-11e75053d1e4
https://medium.com/swlh/real-time-chat-application-using-socket-io-in-node-js-37806e98918c
https://masteringjs.io/tutorials/mongoose/aggregate
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
https://auth0.com/blog/authors/vittorio-bertocci/
