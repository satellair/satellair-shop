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
router.get('/detail/:id', productDetail)
router.post('/add', isLogin, isAdmin, productInsertValidate, addProduct)
router.put('/update/:id', isLogin, isAdmin, productUpdateValidate, updateProduct)
router.delete('/delete/:id', isLogin, isAdmin, deleteProduct)

router.post('/sku/add', isLogin, isAdmin, skuInsertValidate, addSKU)
router.put('/sku/update/:id', isLogin, isAdmin, skuUpdateValidate, updateSKU)
router.delete('/sku/delete/:id', isLogin, isAdmin, deleteSKU)

export default router
