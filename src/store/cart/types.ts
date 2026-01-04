export interface CartItem {
  productId: number
  title: string
  image: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

interface AddItemAction {
  type: typeof ADD_ITEM
  payload: CartItem
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM
  payload: { productId: number }
}

interface UpdateQuantityAction {
  type: typeof UPDATE_QUANTITY
  payload: { productId: number; quantity: number }
}

export type CartAction = AddItemAction | RemoveItemAction | UpdateQuantityAction
