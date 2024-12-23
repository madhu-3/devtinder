Ep-3
  Create and initialize the repo
  understand node_modules,package.json,package-lock.json, dependencies, dev dependencies, -g, Caret and tilde(^ vs ~)
  Install express, create server,listen to port,write req handlers for different routes
  Install Nodemon, update the scripts in package.json
Ep-4
  Express Routing
  Explore use of ? * + () in routes
  use of regex in routes
  reading query params and dynamic routes 
Ep-5
  Multiple Route handlers
  next()
  next() along with res.send and observe the errors 
  array of route handlers, app.use(rh1,[rh2,rh3],rh4)
  what is middleware and why do we need it
  how express handles the requests behind the scenes
  Diff between app.use and app.all
  write a dummy auth middleware for /admin routes
  write a dummy auth middleware for all /user routes except /user/login
  error handling using app.use('/',(err,req,res,next)=>{})
Ep-6
  Get the Connection string which was created during S1 from compass or atlas
  Install Mongoose 
  Connect app to the database "Connection URL"/databaseName
  call the connectdb before listening to the port
  creating schema using mongoose, create a user schema 
  create a POST /signup API to add data to database
  push some documents using that API through postman
  error handling using try catch
Ep-7
  Difference between JS Object and JSON
  add express json middleware
  make signup api dynamic
  findOne-> what it will return if we have multiple docs match the doc
  API- get user by email
  API - feed API - GET /feed - get all users from database
  create a delete user API
  Difference between PATCH and PUT
  API to update a user
  Explore the mongoose documentation for Model methods
  what are options in a Modal.findByIdAndUpdate
Ep-8
  Explore schema type options from documentation
  add default,required, unique,min,max,minLength,maxLength,trim
  create a custom validate function for gender
  Improve the DB schema, put all appropriate validations on each field n schema
  add timestamps to the user schema
  add API level validation on patch request & signup post API
  data sanitization - add API validation for each field
  Install validator library
  Explore Validator library functions and use validator fns for email, password and photo url 
  ***ALWAYS VALIDATE the request body before posting to database***
Ep-9
  validate data in signup API- use helper file
  install bcrypt and generate password hash and store the password
  create login api and add validations
Ep-10
  Install cookie-parser
  just send a dummy cookie to user
  create /profile API and check if we are able to get cookie back
  install jsonwebtoken
  In login API, after email and password validation, create a JWT token and send to user
  read the cookie in profile API and find the logged in user.
  userAUth middleware
  add the userauth middleware in profile api and a new sendconnectionrequest api
  set the expiry of JWT token and the cookie to 7 days
  create userschema method to get JWT
  create userschema method to comparepassword
Ep-11
  Explore tinder APIs
  create a list of all API you can think of for DEV tinder
  Group multiple routes under respective routers
  Read documentation for express.router
  create routes folder for managing auth,profile,request routers
  create authRouter,profileRouter,requestRouter
  Import these routers in app.js
  create post /logout api
  create patch /profile/edit
  create patch /profile/password api-> forgot password
  make sure to validate all data in every post,patch apis
Ep-12
  Create Connection request schema
  Send connection API
  Proper validation of data and think about the corner cases
  Learn Mongo Queries->https://www.mongodb.com/docs/manual/introduction/
  schema.pre("save") function
  Indexes in mongo and need of index in a DB
  advantages & disadvantages of creating indexes
  read about types of indexes- compound index(we used in this)
Ep-13
  POST /request->accept or reject API
  Thought process POST & GET
  Read about ref and populate
  create /user/requests/received with all checks
  create /user/connections
Ep-14
  Build /feed API
  do pagination