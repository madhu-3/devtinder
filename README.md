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