import { validationResult } from 'express-validator'

import { Product, ProductSKU } from '@models'
import { statusCode } from '@config'
import { isOid } from '@utils'

import type { ErrorHandler, ExpressController } from '@type'
import type { IProduct, IProductSKU } from '@type/product'

const listProduct: ExpressController = async (req, res, next) => {
  try {
    const products: IProduct[] = await Product.find().select('_id name category tag status').sort({ _id: -1 })
    res.status(statusCode.OK).json({
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

const addProduct: ExpressController = async (req, res, next) => {
  try {
    const { name, category, tags, description } = req.body as IProduct

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const err: ErrorHandler = new Error('Invalid data')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      err.validation = errors.array()
      throw err
    }

    const product = new Product({
      ...(name && { name }),
      ...(description && { description }),
      ...(category && { category }),
      ...(tags && { tags }),
    })
    await product.save()

    res.status(statusCode.CREATED).json({ message: 'Product created' })
  } catch (error) {
    next(error)
  }
}

const updateProduct: ExpressController = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, category, tags, description } = req.body as IProduct

    if (!isOid(id)) {
      const err: ErrorHandler = new Error('Invalid product id')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      throw err
    }

    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const err: ErrorHandler = new Error('Invalid data')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      err.validation = errors.array()
      throw err
    }

    const product = await Product.updateOne(
      { _id: id },
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(tags && { tags }),
      }
    )

    if (product.modifiedCount === 0) {
      const err: ErrorHandler = new Error('Cannot modify product/ Product not found')
      err.statusCode = statusCode.BAD_REQUEST
      throw err
    } else {
      res.status(statusCode.OK).json({
        message: 'Product updated successfully',
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteProduct: ExpressController = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!isOid(id)) {
      const err: ErrorHandler = new Error('Invalid product id')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      throw err
    }
    const product = await Product.deleteOne({ _id: id })

    if (product.deletedCount === 0) {
      const err: ErrorHandler = new Error('Cannot delete product/Product not found')
      err.statusCode = statusCode.BAD_REQUEST
      throw err
    } else {
      res.status(statusCode.OK).json({
        message: 'Product deleted successfully',
      })
    }
  } catch (error) {
    next(error)
  }
}

const productDetail: ExpressController = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id).select('_id name category tag status description')
    if (!product) {
      const err: ErrorHandler = new Error('Product not found')
      err.statusCode = statusCode.NOT_FOUND
      throw err
    }
    const variants: IProductSKU[] = await ProductSKU.find({ product_id: id }).select(
      '_id color size price stock sold status'
    )
    res.status(statusCode.OK).json({ data: { product, variants } })
  } catch (error) {
    next(error)
  }
}

export { listProduct, addProduct, updateProduct, deleteProduct, productDetail }

const addSKU: ExpressController = async (req, res, next) => {
  try {
    const { product_id, color, size, price, stock, sold, status } = req.body as IProductSKU

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const err: ErrorHandler = new Error('Invalid data')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      err.validation = errors.array()
      throw err
    }

    const sku = new ProductSKU({
      ...(product_id && { product_id }),
      ...(color && { color }),
      ...(size && { size }),
      ...(price && { price }),
      ...(stock && { stock }),
      ...(sold && { sold }),
      ...(status && { status }),
    })
    await sku.save()

    res.status(statusCode.CREATED).json({ message: `Create SKU of product id: ${product_id}` })
  } catch (error) {
    next(error)
  }
}

const updateSKU: ExpressController = async (req, res, next) => {
  try {
    const { id } = req.params
    const { product_id, color, size, price, stock, sold, status } = req.body as IProductSKU

    if (!isOid(id)) {
      const err: ErrorHandler = new Error('Invalid SKU id')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      throw err
    }

    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const err: ErrorHandler = new Error('Invalid data')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      err.validation = errors.array()
      throw err
    }

    const product = await ProductSKU.updateOne(
      { _id: id },
      {
        ...(color && { color }),
        ...(size && { size }),
        ...(price && { price }),
        ...(stock && { stock }),
        ...(sold && { sold }),
        ...(status && { status }),
      }
    )

    if (product.modifiedCount === 0) {
      const err: ErrorHandler = new Error('Cannot modify product/Product not found')
      err.statusCode = statusCode.BAD_REQUEST
      throw err
    } else {
      res.status(statusCode.OK).json({
        message: 'Product updated successfully',
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteSKU: ExpressController = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!isOid(id)) {
      const err: ErrorHandler = new Error('Invalid SKU id')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      throw err
    }
    const product = await ProductSKU.deleteOne({ _id: id })

    if (product.deletedCount === 0) {
      const err: ErrorHandler = new Error('Cannot delete SKU/SKU not found')
      err.statusCode = statusCode.BAD_REQUEST
      throw err
    } else {
      res.status(statusCode.OK).json({
        message: 'Product deleted successfully',
      })
    }
  } catch (error) {
    next(error)
  }
}

export { addSKU, updateSKU, deleteSKU }
