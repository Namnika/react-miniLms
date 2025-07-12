const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Courses', courseSchema)