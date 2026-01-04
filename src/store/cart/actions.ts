import { ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CartItem } from './types'

export const addItem = (item: CartItem) => ({
  type: ADD_ITEM as typeof ADD_ITEM,
  payload: item,
})

export const removeItem = (productId: number) => ({
  type: REMOVE_ITEM as typeof REMOVE_ITEM,
  payload: { productId },
})

export const updateQuantity = (productId: number, quantity: number) => ({
  type: UPDATE_QUANTITY as typeof UPDATE_QUANTITY,
  payload: { productId, quantity },
})

// action creators
