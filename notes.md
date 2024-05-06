# Google Authorization
- We have done authorization through passport in this app
- here we have made a basic user model consisting of profileId, email and username
- we have used mongodb for storing the user  data
- we have used express-session for session management
## Flow of  App
 ==Index.js->(db/index.js, DB Connection)->app.js->UserRoutes==

 ## DataBase Connection
 - it is the general function to connect mongoodb with the app, the only difference is 
 *w:majority*
 - w:majority:
    >writeConcern: This option allows you to specify the write concern mode for write operations performed by Mongoose. Write concern determines the level of acknowledgment required from MongoDB servers for write operations to be considered successful. In this case, 'majority' is specified as the write concern mode, which means that write operations must be acknowledged by a majority of the replica set members to be considered successful. This ensures data consistency and durability by requiring acknowledgment from a majority of data-bearing members in the replica set before confirming the success of write operations.

## Auth.js
 ### Serialization and deserialization
 - deserialization- Deserialization in Passport.js is the process of converting a user object, which is stored in the session, back into a user object that can be used by the application. This is done using the deserializeUser() function, which is supplied by the application.
The deserializeUser() function takes the user id as its only argument and returns a user object. The user object can be anything that the application needs it to be, such as a database record or a custom object.
- Serialization - Used to store user id into session
### Basic Work of auth
- here we check that a user with same credentials exists in database or not, if it exists, we return that user object and if it not exists, we make a new user object and save it in database

## app.js
### Session management
- there are  three things to be checked
    - Secret - secret key to access sesssion
    - resave - This option controls whether the session should be saved to the session store on every request, even if the session data has not been modified. So we have set it to false to not unnecesarily update session
    - saveUninitialized - This option determines whether to save a new session with uninitialized data to the session store. When set to false, the session will not be saved for a new session that has not been modified, so no unnecessary sessio s will be created
### Initialize passport-
- `app.use(passport.initialize());`- it is used to initialize passport
- `app.use(passport.session());`- it is very important as with this passport will store user info in session