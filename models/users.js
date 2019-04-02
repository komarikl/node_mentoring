import mongoose, { Schema } from 'mongoose'

const Users = new Schema({
    login: { type: String, index: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastModifiedDate: Date
})

Users.pre('save', async function UsersUpdate(next) {
    this.lastModifiedDate = new Date()
    next()
})

export default mongoose.model('Users', Users)
