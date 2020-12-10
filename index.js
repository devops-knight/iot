const express = require('express');
const app = express();
const port = 1499;


app.use('/', require('./routes'));
app.use('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Connection error: ${err}`);
    }
    console.log(`Hurrrr!, This Server Work Perfectly On Port NO: ${port}`);
})