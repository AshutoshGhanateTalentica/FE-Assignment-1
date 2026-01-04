import { createStore, combineReducers } from 'redux'
import { cartReducer } from './cart/reducer'

const rootReducer = combineReducers({
  cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persisted = (() => {
  try {
    const raw = localStorage.getItem('ecom_cart_v1')
    if (!raw) return undefined
    return { cart: JSON.parse(raw) }
  } catch (e) {
    return undefined
  }
})()

export const store = createStore(rootReducer, persisted)

store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem('ecom_cart_v1', JSON.stringify(state.cart))
  } catch (e) {
    // ignore
  }
})

export default store
