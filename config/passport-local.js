const passport = require('passport');
const User_detail = require('../models/user_detail');
const LocalStrategy = require('passport-local').Strategy;

const UserDetail = require('../models/user_detail');

passport.use(new LocalStrategy({
    usernameField: 'email'},
    function(email,password,done){
        UserDetail.findOne({email: email},function(err,user){
            if(err){
                console.log('Error In Finding User ----> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null, false);
            }
            console.log("its done");
            return done(null,user);
        })
    }
));

//serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from the cookie

passport.deserializeUser(function(id, done){
    User_detail.findById(id, function(err, user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }

        return done(null, user);
    });
});


passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        console.log('check');
        return next();
    }

    return  res.redirect('/user/signin');
}


passport.setAuthenticated = function(req,res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;