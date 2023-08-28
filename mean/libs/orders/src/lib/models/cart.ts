export class Cart{
  items?: CartItem[]
}
export class CartItem{
  productId?: number
  quantity?: number

}
export class CartItemDetailed{
  product?: any
  quantity?: number
}