import type { Schema } from 'mongoose'

type ProductCategory =
  | 'tops'
  | 'bottoms'
  | 'skirts'
  | 'sportwares'
  | 'innerwares'
  | 'dresses'
  | 'accessories'
  | 'bags'
  | 'others'
type ProductTags = 'new' | 'hot' | 'sale' | 'recommend' | 'none'
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
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'none'
  price: number
  tags: ProductTags
  stock: number
  sold: number
  status: 'active' | 'suspended'
}

export { IProduct, IProductSKU, ProductCategory }
