N-taker
=======
### Note taker
Is a basic full stack web application with nodeJs, express, and mongoDB
The Purpose of this project is, for myself, to learn the basic practical workflow of a MCV pattern web application, restAPI, database, basic server side authentication, basically everything that are good to know for a full web software deployment. It is currently still under development.

## Feature
#### Available
* Simple note taking web app
* RestAPI respond and request, GET, POST, PUT, DELETE
* Register and login server side w/ local strategy authentication
* Notes protection from unauthorized user
* Basic UI with bootstrap css and handlebars template

#### Future
* More elaborate UI
* Forgot Password button
* Delete note confirmation
* Personalization of the notes

Version `0.1.5`
Deployed at `polar-lake-76141.herokuapp.com`

## Dependency
* [Node](https://nodejs.org/en/) - The web framework used
* [Express](https://expressjs.com/) - main package for nodeJS
* [express-handlebars](https://github.com/ericf/express-handlebars) - A Handlebars view engine for Express
* [express-session](https://github.com/expressjs/session) - Simple middleware session for express
* [method-override](https://github.com/expressjs/method-override) - PUT or DELETE in places where the client doesn't support it.
* [connect-flash](https://github.com/jaredhanson/connect-flash) - Flash message middleware for Connect and Express.
* [mongoose](http://mongoosejs.com/) - elegant mongoDB object modeling for nodeJS (ORM)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - crypto for password encryption
* [passport](https://www.npmjs.com/package/passport) - login authentication


## Authors

* **Joseph Alfredo** - *Initial work* - [Bentzkast](https://github.com/Bentzkast)

## License

This project is licensed under the ISC License

## Acknowledgments

* Brad Traversy - best online mentor on web dev
* Nick - best friend and App Tester



<!-- ./mongod --directoryperdb --dbpath /Users/Jalfredo/Documents/mongodb-osx-x86_64-3.4.9/data/db --logpath /Users/Jalfredo/Documents/mongodb-osx-x86_64-3.4.9/log/mongo.log --logappend --rest & -->
