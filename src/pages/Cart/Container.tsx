import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { removeItem, updateQuantity } from '../../store/cart/actions'
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback'
import { useAnnouncer } from '../../contexts/AnnouncerContext'

const CartPage: React.FC = () => {
  const cart = useSelector((s: RootState) => s.cart)
  const dispatch = useDispatch()
  const announce = useAnnouncer()

  const total = cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    <section className="cart container">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? <p>Cart is empty</p> : (
        <ul className="cart-list">
          {cart.items.map(it => (
            <li key={it.productId} className="cart-item">
              <ImageWithFallback src={it.image} alt={it.title} />
              <div className="info">
                <div className="name">{it.title || 'Product'}</div>
                <div className="price">${it.price.toFixed(2)}</div>
                <div className="qty">
                  <button onClick={() => { dispatch(updateQuantity(it.productId, Math.max(1, it.quantity - 1))); announce('Quantity updated') }}>-</button>
                  <input type="number" value={it.quantity} min={1} onChange={e => { dispatch(updateQuantity(it.productId, Math.max(1, Number(e.target.value) || 1))); announce('Quantity updated') }} />
                  <button onClick={() => { dispatch(updateQuantity(it.productId, it.quantity + 1)); announce('Quantity updated') }}>+</button>
                </div>
                <button onClick={() => { dispatch(removeItem(it.productId)); announce('Item removed from cart') }}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="total">Total: ${total.toFixed(2)}</div>
    </section>
  )
}

export default CartPage
