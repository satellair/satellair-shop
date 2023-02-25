import { checkSchema } from 'express-validator'
import type { Schema } from 'express-validator'
import type { ProductCategory, ProductTags } from '@type/product'

const productCategory: ProductCategory[] = [
  'tops',
  'bottoms',
  'skirts',
  'sportwares',
  'innerwares',
  'dresses',
  'accessories',
  'bags',
  'others',
]

const productTags: ProductTags[] = ['new', 'hot', 'sale', 'recommend', 'none']

const productInsertSchema: Schema = {
  name: {
    notEmpty: {
      errorMessage: 'Please enter product name',
    },
  },
  category: {
    notEmpty: {
      errorMessage: 'Please enter product category',
    },
    isIn: {
      errorMessage: `Invalid product category:  ['${[...productCategory].join("', '")}']`,
      options: [[...productCategory, null]],
    },
  },
  tags: {
    notEmpty: {
      errorMessage: 'Please enter product tag',
    },
    isIn: {
      errorMessage: `Invalid product tag: ['${[...productTags].join("', '")}']`,
      options: [[...productTags, null]],
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Please enter product description',
    },
  },
}

const productUpdateSchema: Schema = {
  category: {
    isIn: {
      errorMessage: `Invalid product category: ['${[...productCategory].join("', '")}']`,
      options: [[...productCategory, null]],
    },
  },
  tags: {
    isIn: {
      errorMessage: `Invalid product tag: ['${[...productTags].join("', '")}']`,
      options: [[...productTags, null]],
    },
  },
}

const productInsertValidate = checkSchema(productInsertSchema)
const productUpdateValidate = checkSchema(productUpdateSchema)
export { productInsertValidate, productUpdateValidate }
