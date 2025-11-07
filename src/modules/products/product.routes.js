
import express from 'express'
import { createProductController, getAllProductController } from './product.controller.js'

const router = express.Router()

router.post('/',createProductController)
router.get('/',getAllProductController)



export default router