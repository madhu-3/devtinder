

# Auth Router
POST /signup
POST /login
POST /logout

# Feed Router
GET /feed  //get all users initially in home screen

# Connection Router-> Home screen view, like or reject profile, block or report profile
POST /connection/profile/interested/:userId
POST /connection/profile/ignored/:userId
GET /connection/profile/:userId //viewing full profile of the feed user
POST /connection/profile/block/:userId
POST /connection/profile/report/:userId
 
 # request Router
 GET /requests
 POST /requests/accept/:requestId
 POST /requests/reject/:requestId

# userRouter
GET /user/profile
PATCH /user/profile
PATCH /user/password
POST /uploadphoto  //can we use for both initial and later photo update??

# ----------------
# Auth Router
POST /signup
POST /login
POST /logout

# profileouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password
POST /profile/uploadphoto  //can we use for both initial and later photo update??

# connectionRequest Router-> Home screen view, like or reject profile, block or report profile

POST /request/send/interested/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

GET /request/profile/:userId //viewing full profile of the feed user
POST /request/profile/block/:userId
POST /request/profile/report/:userId

# userRouter
GET /user/connections
GET /user/requests
GET /user/feed