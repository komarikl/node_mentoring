const mongoose = require('mongoose')

const Products = new mongoose.Schema({
    title: { type: String, index: true, required: true },
    reviews: { type: [String], required: true, default: [] },
    lastModifiedDate: Date
})

Products.pre('save', async function ProductsUpdate(next) {
    this.lastModifiedDate = new Date()
    next()
})

module.exports = mongoose.model('Products', Products)
