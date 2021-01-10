const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 1499;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const Contact_detail = require('./models/contact_detail');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const Mongo_s = require('connect-mongo')(session);
const flash = require('connect-flash');
const flash_middleware = require('./config/flash');


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/uploads',express.static(__dirname+'/uploads'));


app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name : 'user_id',
    secret: 'Knight@1234',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 *100)
    },
    store: new Mongo_s({
        mongooseConnection: db,
        autoRemove: 'disable'
    },
    function(err){
        console.log(err || 'connect Mongodb setup okk');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    // console.log(req.session);
    // console.log(req.user);
    next();
});

app.use(passport.setAuthenticated);

app.use(flash());
app.use(flash_middleware.setFlash);

app.use('/', require('./routes'));




app.listen(port, function(err){
    if(err){
        console.log(`Connection error: ${err}`);
    }
    console.log(`Hurrrr!, This Server Work Perfectly On Port NO: ${port}`);
})