const mongoose = require('mongoose');

const relay_schema = new mongoose.Schema({
   realy:{
       type: Boolean,
       required: true
   },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default: Date.now
    }
});

const Relay_detail = mongoose.model('relay_detail', relay_schema);

module.exports = Relay_detail;