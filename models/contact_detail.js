const mongoose = require('mongoose');

const contactd_schema = new mongoose.Schema({
    category:{
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    project_detail: {
        type: String,
        required: true,
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

const Contact_detail = mongoose.model('contact_detail', contactd_schema);

module.exports = Contact_detail;