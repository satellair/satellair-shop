import { checkSchema } from 'express-validator'
import type { Schema } from 'express-validator'
import type { SKUSize } from '@type/product'
const skuSize: SKUSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'none']

const skuInsertSchema: Schema = {
  product_id: {
    notEmpty: {
      errorMessage: 'Please enter product id',
    },
  },
  color: {
    notEmpty: {
      errorMessage: 'Please enter product color',
    },
  },
  size: {
    notEmpty: {
      errorMessage: 'Please enter product size',
    },
    isIn: {
      errorMessage: `Invalid proudct SKU size: ['${[...skuSize].join("', '")}']`,
      options: [[...skuSize, null]],
    },
  },
  price: {
    notEmpty: {
      errorMessage: 'Please enter product price',
    },
    isNumeric: {
      errorMessage: 'Price must be a number',
    },
  },
  stock: {
    isNumeric: {
      errorMessage: 'Stock must be a number',
    },
  },
}

const skuUpdateSchema: Schema = {
  size: {
    isIn: {
      errorMessage: `Invalid proudct SKU size: ['${[...skuSize].join("', '")}']`,
      options: [[...skuSize, null]],
    },
  },
  price: {
    isNumeric: {
      errorMessage: 'Price must be a number',
    },
  },
  stock: {
    isNumeric: {
      errorMessage: 'Stock must be a number',
    },
  },
}

const skuInsertValidate = checkSchema(skuInsertSchema)
const skuUpdateValidate = checkSchema(skuUpdateSchema)

export { skuInsertValidate, skuUpdateValidate }
