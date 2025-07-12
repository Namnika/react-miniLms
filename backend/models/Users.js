const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate")

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    }
})

userSchema.plugin(findOrCreate)
module.exports = mongoose.model('Users', userSchema)