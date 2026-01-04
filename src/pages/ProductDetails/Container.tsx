import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../../api/fakeStore'
import { useDispatch } from 'react-redux'
import { addItem } from '../../store/cart/actions'
import { useAnnouncer } from '../../contexts/AnnouncerContext'
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback'

const ProductDetails: React.FC = () => {
  const { id } = useParams()
  const { data: product, isLoading } = useQuery(['product', id], () => fetchProductById(id!))
  const dispatch = useDispatch()
  const announce = useAnnouncer()

  if (isLoading) return <p>Loading...</p>
  if (!product) return <p>Product not found</p>

  const handleAdd = () => {
    dispatch(addItem({ productId: product.id, title: product.title, image: product.image, price: product.price, quantity: 1 }))
    announce(`${product.title} added to cart`)
  }

  return (
    <section className="product-details container">
      <ImageWithFallback src={product.image} alt={product.title} />
      <div>
        <h2>{product.title}</h2>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    </section>
  )
}

export default ProductDetails
