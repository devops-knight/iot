const  mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User_detail = mongoose.model('user_detail', user_schema);

module.exports = User_detail;