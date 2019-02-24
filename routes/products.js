import express from 'express'
import * as ProductsController from '../controllers/products'

const router = express.Router()

router.get('/api/products', ProductsController.getProducts)
router.get('/api/products/:id', ProductsController.getProductById)
router.get('/api/products/:id/reviews', ProductsController.getProductReviewsById)
router.post('/api/products', ProductsController.addNewProduct)

export default router
