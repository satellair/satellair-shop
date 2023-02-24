export const OID_REGEX = /^[0-9a-fA-F]{24}$/

export const PRODUCT_CATEGORY_REGEX =
  /^tops$|^bottoms$|^skirts$|^sportwares$|^innerwares$|^dresses$|^accessories$|^bags$|^others$/

export const PRODUCT_TAG_REGEX = /^new$|^hot$|^sale$|^recommend$|^none$/

export const SKU_SIZE_REGEX = /^XS$|^S$|^M$|^L$|^XL$|^XXL$|^XXXL$|^none$/

export const TEL_REGEX = /^(0[689]{1})+([0-9]{8})$|^(0[12]{1})+([0-9]{7})$/

export const validatePattern = (pattern: RegExp, value: string): boolean => {
  return pattern.test(value)
}

export const isOid = (oid: string): boolean => {
  return validatePattern(OID_REGEX, oid)
}
