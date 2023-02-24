import express from 'express'
import {
  listProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  productDetail,
  addSKU,
  updateSKU,
  deleteSKU,
} from '@controllers/product-controller'
import { productInsertValidate, productUpdateValidate } from '@schemas/product-schema'
import { skuInsertValidate, skuUpdateValidate } from '@schemas/sku-schema'

import type { Router } from 'express'

import isLogin from '@middlewares/auth-jwt'
import isAdmin from '@middlewares/admin-auth'

const router: Router = express.Router()

router.get('/', (_, res) => {
  res.send('Product page')
})
router.get('/all', listProduct)
router.get('/i/:id', productDetail)
router.post('/a', isLogin, isAdmin, productInsertValidate, addProduct)
router.put('/u/:id', isLogin, isAdmin, productUpdateValidate, updateProduct)
router.delete('/d/:id', isLogin, isAdmin, deleteProduct)

router.post('/sku/a', isLogin, isAdmin, skuInsertValidate, addSKU)
router.put('/sku/u/:id', isLogin, isAdmin, skuUpdateValidate, updateSKU)
router.delete('/sku/d/:id', isLogin, isAdmin, deleteSKU)

export default router
