import { Schema, model } from 'mongoose'

import type { IProductSKU } from '@type/product'

const schema = new Schema<IProductSKU>(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
      default: 'none',
      match: [/^XS$|^S$|^M$|^L$|^XL$|^XXL$|^XXXL$|^none$/, 'Invalid size'],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },
  },
  {
    collection: 'product_skus',
    timestamps: true,
  }
)

const Address = model<IProductSKU>('Product_SKUs', schema)

export default Address
