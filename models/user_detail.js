const  mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar:{
        type: String
    },
    adrs: {
        type: String
    },
    description: {
        type: String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

user_schema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
user_schema.statics.avatarPath = AVATAR_PATH;

const User_detail = mongoose.model('user_detail', user_schema);

module.exports = User_detail;