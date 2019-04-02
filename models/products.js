import mongoose, { Schema } from 'mongoose'

const Products = new Schema({
    title: { type: String, index: true, required: true },
    reviews: { type: [String], required: true, default: [] },
    lastModifiedDate: Date
})

Products.pre('save', async function ProductsUpdate(next) {
    this.lastModifiedDate = new Date()
    next()
})

export default mongoose.model('Products', Products)
