import type { Schema } from 'mongoose'

export type ProductCategory =
  | 'tops'
  | 'bottoms'
  | 'skirts'
  | 'sportwares'
  | 'innerwares'
  | 'dresses'
  | 'accessories'
  | 'bags'
  | 'others'
export type ProductTags = 'new' | 'hot' | 'sale' | 'recommend' | 'none'
export type SKUSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'none'
type b64 = string

interface IProduct {
  name: string
  category: ProductCategory
  tags: ProductTags
  description: string
  status: 'active' | 'suspended'
}

interface IProductSKU extends IProduct {
  product_id: Schema.Types.ObjectId
  color: string
  size: SKUSize
  price: number
  stock: number
  sold: number
  status: 'active' | 'suspended'
}

export { IProduct, IProductSKU }
