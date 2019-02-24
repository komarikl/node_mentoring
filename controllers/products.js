import { products } from '../models'

export const getProducts = async (req, res) => {
    res.json(products)
}

export const getProductById = async (req, res, next) => {
    const { id } = req.params
    const product = products.find(p => p.id === id)

    if (!product) {
        return next({
            status: 404,
            message: 'Product not found!'
        })
    }

    res.json(product)
}

export const getProductReviewsById = async (req, res, next) => {
    const { id } = req.params
    const product = products.find(p => p.id === id)

    if (!product) {
        return next({
            status: 404,
            message: 'Product not found!'
        })
    }

    res.json(product.reviews)
}

export const addNewProduct = async (req, res) => {
    const { id = '0', title = '', reviews = [] } = req.body || {}
    const newProduct = { id, title, reviews }

    products.push(newProduct)
    res.json(newProduct)
}
