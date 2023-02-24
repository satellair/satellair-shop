import { Schema, model, Document } from 'mongoose'
import type { IProduct } from '@type/product'

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'others',
      // match with ProductCategory type
      match: [
        /^tops$|^bottoms$|^skirts$|^sportwares$|^innerwares$|^dresses$|^accessories$|^bags$|^others$/,
        'Invalid category',
      ],
    },
    tags: {
      type: String,
      required: true,
      trim: true,
      default: 'none',
      // match with ProductTags type
      match: [/^new$|^hot$|^sale$|^recommend$|^none$/, 'Invalid tags'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
)

const Product = model<IProduct>('Product', productSchema)

export default Product
