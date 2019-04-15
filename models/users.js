const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    login: { type: String, index: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastModifiedDate: Date
})

Users.pre('save', async function UsersUpdate(next) {
    this.lastModifiedDate = new Date()
    next()
})

module.exports = mongoose.model('Users', Users)
