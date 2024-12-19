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