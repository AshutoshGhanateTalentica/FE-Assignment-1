import { CartState, CartAction, ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY } from './types'

const initialState: CartState = { items: [] }

export function cartReducer(state = initialState, action: CartAction): CartState {
  switch (action.type) {
    case ADD_ITEM: {
      const existing = state.items.find(i => i.productId === action.payload.productId)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.payload.productId ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case REMOVE_ITEM: {
      return { ...state, items: state.items.filter(i => i.productId !== action.payload.productId) }
    }
    case UPDATE_QUANTITY: {
      return {
        ...state,
        items: state.items.map(i => (i.productId === action.payload.productId ? { ...i, quantity: action.payload.quantity } : i)),
      }
    }
    default:
      return state
  }
}
