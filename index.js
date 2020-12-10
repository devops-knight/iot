const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 1499;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const Contact_detail = require('./models/contact_detail');


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.listen(port, function(err){
    if(err){
        console.log(`Connection error: ${err}`);
    }
    console.log(`Hurrrr!, This Server Work Perfectly On Port NO: ${port}`);
})