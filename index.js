const express = require('express');
const app = express();
const port = 1499;

app.listen(port, function(err){
    if(err){
        console.log(`Connection error: ${err}`);
    }
    console.log(`Hurrrr!, This Server Work Perfectly On Port NO: ${port}`);
})