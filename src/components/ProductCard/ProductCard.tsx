import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback'

interface Props {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  onChangeQuantity: (id: number, qty: number) => void
}

const ProductCard: React.FC<Props> = ({ id, title, price, image, quantity, onChangeQuantity }) => {
  const titleId = `product-title-${id}`
  return (
    <article className="product-card" role="listitem">
      <Link to={`/product/${id}`} className="product-link" aria-labelledby={titleId}>
        <ImageWithFallback src={image} alt={title} loading="lazy" />
        <h3 id={titleId}>{title}</h3>
      </Link>
      <div className="product-meta">
        <div className="price">${price.toFixed(2)}</div>
        <div className="qty-control" role="group" aria-label={`Quantity control for ${title}`}>
          <button aria-label={`decrease quantity for ${title}`} onClick={() => onChangeQuantity(id, Math.max(1, quantity - 1))}>-</button>
          <input
            aria-label={`quantity for ${title}`}
            type="number"
            min={1}
            value={quantity}
            onChange={e => onChangeQuantity(id, Math.max(1, Number(e.target.value) || 1))}
          />
          <button aria-label={`increase quantity for ${title}`} onClick={() => onChangeQuantity(id, quantity + 1)}>+</button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
