// Main starting point of our application
const express = require('express'); // code sharing between files, without ES6
const http = require('http'); // http is a native node library
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

// DB Setup
mongoose.connect('mongodb://localhost/auth');

// App setup (express)
app.use(morgan('combined')); 
// body-parser extract the entire body portion of an incoming request stream and exposes it on  req.body.
// The middleware was a part of Express.js earlier but now you have to install it separately.
// bodyParser.json(): Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json({type: '*/*'}));
router(app);


// morgan and bodyparser are middlewares for express.
// middlewares in express are any incoming requests that is passed into
// - morgan is a logging frameework
// - bodyParser is used to parse incoming requests - parse to json no matter request type is  (type: */*)
// - nodeman watches our directory for any file changes.If any file change, it will restart the server



// Server setup (for express to talk to outside world)
const port = process.env.PORT || 3090;
const server = http.createServer(app); // http is a native node library for very low level http 
                                       // requests that are incoming
server.listen(port);
console.log('Server listening on: PORT ', port);