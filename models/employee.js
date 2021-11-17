const { Schema, model } = require('mongoose')

const employeeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['designer', 'back-end developer', 'front-end developer', 'quality analyst']
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    }
})

module.exports = model('Employee', employeeSchema)