const Products = require('../../models/products');

const getProducts = async (req, res, next) => {
    Products.find({})
        .then(r => res.json(r))
        .catch(err => console.log(err))
}

const getProductById = async (req, res, next) => {
    const { id: _id } = req.params
    Products.findOne({ _id })
        .then(product => (product ? res.json(product) : next({ status: 404, message: 'Product not found!' })))
        .catch(err => console.log(err))
}

const getProductReviewsById = async (req, res, next) => {
    const { id: _id } = req.params
    Products.findOne({ _id })
        .then(product => (product ? res.json(product.reviews) : next({ status: 404, message: 'Product not found!' })))
        .catch(err => console.log(err))
}

const addNewProduct = async (req, res, next) => {
    const { title = '', reviews = [] } = req.body || {}
    const newProduct = { title, reviews }
    Products.create(newProduct)
        .then(r => res.json(r))
        .catch(err => console.log(err))
}

const deleteProduct = async (req, res, next) => {
    const { id: _id } = req.params
    Products.findByIdAndRemove({ _id })
        .then(() => res.json({ result: 'Success!' }))
        .catch(err => console.log(err))
}

module.exports = {
    deleteProduct,
    addNewProduct,
    getProductById,
    getProductReviewsById,
    getProducts
}