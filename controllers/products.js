import models from '../models/'

export const getProducts = async (req, res, next) => {
    models.Products.findAll({})
        .then(products => {
            res.json(products)
        })
        .catch(err => console.log(err))
}

export const getProductById = async (req, res, next) => {
    const { id } = req.params
    models.Products.findAll({ where: { id } })
        .then(products => {
            if (!products.length) {
                return next({
                    status: 404,
                    message: 'Product not found!'
                })
            }

            res.json(products[0])
        })
        .catch(err => console.log(err))
}

export const getProductReviewsById = async (req, res, next) => {
    const { id } = req.params
    models.Products.findAll({ where: { id } })
        .then(products => {
            if (!products.length) {
                return next({
                    status: 404,
                    message: 'Product not found!'
                })
            }

            res.json(products[0].reviews)
        })
        .catch(err => console.log(err))
}

export const addNewProduct = async (req, res, next) => {
    const { title = '', reviews = [] } = req.body || {}
    const newProduct = { title, reviews }
    models.Products.create(newProduct)
        .then(created => res.json(created))
        .catch(err => console.log(err))
}
