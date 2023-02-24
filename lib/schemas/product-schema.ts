import { checkSchema } from 'express-validator'
import type { Schema } from 'express-validator'

// product schema
const productSchema: Schema = {
  name: {
    notEmpty: {
      errorMessage: 'Please enter product name',
    },
  },
  category: {
    notEmpty: {
      errorMessage: 'Please enter product category',
    },
  },
  tags: {
    notEmpty: {
      errorMessage: 'Please enter product tags',
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Please enter product description',
    },
  },
}
