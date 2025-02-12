//hash password
const {hashSync,genSaltSync,compareSync} = require('bcryptjs');
const { registerValidation,loginValidation } = require('../config/validation');
//sign up page
exports.signup = function(req,res){
    message = '';
    if(req.method == "POST"){
        var post = req.body;

        const { error } = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        var first_name = post.first_name;
        var last_name = post.last_name;
        var email = post.email;
        var mobile_num = post.mobile_num;
        var username = post.username;
        emailRegex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        //console.log(emailRegex.test(email));
        if(!emailRegex.test(email)){
            message = "Email format is not correct!";
            res.render('signup.ejs',{message:message});
            return false;
        }
   
        //hash password
        const salt = genSaltSync(10);

        var password = hashSync(post.password,salt);
        console.log(password);
        var sql = "insert into users(first_name,last_name,email,mobile_num,username,password) values ('" + first_name + "','" + last_name + "','" + email + "','" + mobile_num + "','" + username + "','" + password +"')";
        
        var query = db.query(sql,function(err,result){
            message = "Successfully! A new account has been created!";
            res.render('signup.ejs',{message:message});
        });
    }else{
        res.render('signup');
    }
};
//login page 
exports.login = function(req,res){
    var message = '';
    var sess = req.session;

    if(req.method == "POST"){
        var post = req.body;
        var username = post.username;
    
        var sql = "select id,first_name,last_name,email,password from users where username = '"+username+"'";
        db.query(sql,function(err,recordset){
            var password = recordset.recordset[0].password;
            if(compareSync(post.password,password)){
                req.session.userId = recordset.recordset[0].id;
                req.session.user = recordset.recordset[0];
                //console.log(req.session.userId);
                res.redirect('/home/dashboard');
            }else{
                message = "Wrong Credentials!";
                res.render('index.ejs',{message:message});
            }
        });
    }else{
        res.render('index.ejs',{message:message});
    }
};
//dashboard page functionality
exports.dashboard = function(req,res,next){
    var user = req.session.user;
    var userId = req.session.userId;
    //console.log("userId = "+userId);
    if(userId == null){
        res.redirect("/login");
        return;
    }
    var sql = "select * from users where id = " + userId + "";
    //console.log(sql);
    db.query(sql,function(err,recordset){
        //console.log(recordset);
        res.render('dashboard.ejs',{user:user});
    });
};
//logout functionality
exports.logout = function(req,res){
    req.session.destroy(function(err){
        res.redirect("/login");
    })
};
//profile page
exports.profile = function(req,res){
    var userId = req.session.userId;
    if(userId == null){
        res.redirect("/login");
        return;
    }
    var sql = "select * from users where id = " + userId + "";
    //console.log(sql);
    db.query(sql,function(err,recordset){
        //console.log(recordset.recordset);
        res.render('profile.ejs',{data:recordset.recordset});
    });
};