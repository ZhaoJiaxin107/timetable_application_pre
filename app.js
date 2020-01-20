const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');

const session = require('express-session');
const app = express();
var {sql} = require('./config/database.js');
let bodyParser = require('body-parser');


//all environment variables
app.set('port',process.env.PORT || 8080);
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}));

app.get('/',routes.index);//call for main index page
app.get('/signup',user.signup);//call for signup page
app.post('/signup',user.signup);//call for signup post
app.get('/login',routes.index);//call for login page
app.post('/login',user.login);//call for login post
app.get('/home/dashboard',user.dashboard);//call for dashboard page
app.get('/home/logout',user.logout)//call for logout
app.get('/home/profile',user.profile)//call for user profile
//listen to the server
app.listen(8080,function(){
    console.log('Port 8080 is running...');
});