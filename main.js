// Require all modules needed for the app
require('dotenv').config();
const express = require('express');
const expressEdge = require('express-edge');
const edge = require("edge.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

// Require the controllers needed for MVC model
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const postsPageController = require('./controllers/postsPage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const deletePostController = require('./controllers/deletePost');
const updateController = require('./controllers/update');
const storeUpdateController = require('./controllers/storeUpdate');

// Require middlewares to ensure validation of data
const storePost = require("./middlewares/storePost");
const auth = require('./middlewares/auth');
const redirect = require('./middlewares/redirect');

// Create app
const app = express();
// Connect with database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});
const mongoStore = connectMongo(expressSession);

// Set all features needed from modules
app.use(expressEdge);
app.set('views', `${__dirname}/views`);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_KEY,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(connectFlash());
app.use('*', (request, response, next) => {
  edge.global('auth', request.session.userID);
  next();
});

// Set route with their respective middleware and controller
app.get('/', homePageController);
app.get('/posts', postsPageController);
app.get('/post/:id', getPostController);
app.get('/create', auth, createPostController);
app.post('/store', auth, storePost, storePostController);
app.get('/register', redirect, createUserController);
app.post('/signin', redirect, storeUserController);
app.get('/login', redirect, loginController);
app.post('/loginpost', redirect, loginUserController);
app.get('/logout', auth, logoutController);
app.post('/delete/:id', deletePostController);
app.get('/update/:id', updateController);
app.post('/storeupdate', storeUpdateController);
app.use((request, response) => {
  response.render('404');
});

// Launch app on PORT
app.listen(process.env.PORT, () => {
  console.log("* Running on http://localhost:" + process.env.PORT);
});