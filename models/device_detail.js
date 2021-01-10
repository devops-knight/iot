const  mongoose = require('mongoose');

const device_schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    relays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'relay_detail'
        }
    ],
    
},{
    timestamps: true
});

const Device_detail = mongoose.model('device_detail', device_schema);

module.exports = Device_detail;
