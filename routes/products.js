import express from 'express'
import { checkToken } from '../middlewares'
import * as ProductsController from '../api/controllers/products'

const router = express.Router()

router.get('/api/products', checkToken, ProductsController.getProducts)
router.post('/api/products', checkToken, ProductsController.addNewProduct)
router.get('/api/products/:id', checkToken, ProductsController.getProductById)
router.delete('/api/products/:id', checkToken, ProductsController.deleteProduct)
router.get('/api/products/:id/reviews', checkToken, ProductsController.getProductReviewsById)

export default router
