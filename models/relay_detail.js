const  mongoose = require('mongoose');

const relay_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    min_val: {
        type: Number,
        required: true
    },
    max_val: {
        type: Number,
        required: true
    },
    off_message: {
        type: String,
        required: true
    },
    on_message: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'device_detail',
        required: true
    }
},{
    timestamps: true
});

const Relay_detail = mongoose.model('relay_detail', relay_schema);

module.exports = Relay_detail;