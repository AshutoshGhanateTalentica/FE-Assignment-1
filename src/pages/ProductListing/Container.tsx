import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchCategories } from '../../api/fakeStore'
import ProductCard from '../../components/ProductCard/ProductCard'
import Pagination from '../../components/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addItem, updateQuantity } from '../../store/cart/actions'
import { useAnnouncer } from '../../contexts/AnnouncerContext'

const PAGE_SIZE = 12

const ProductListing: React.FC = () => {
  const { data: products = [], isLoading } = useQuery(['products'], fetchProducts)
  const { data: categories = [] } = useQuery(['categories'], fetchCategories)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('')
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const cart = useSelector((s: RootState) => s.cart)
  const announce = useAnnouncer()

  const filtered = useMemo(() => {
    let list = Array.isArray(products) ? products : []
    if (search) list = list.filter((p: any) => p.title.toLowerCase().includes(search.toLowerCase()))
    if (category) list = list.filter((p: any) => p.category === category)
    return list
  }, [products, search, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const getQty = (id: number) => {
    const it = cart.items.find(i => i.productId === id)
    return it ? it.quantity : 1
  }

  const handleChangeQty = (id: number, qty: number) => {
    const exists = cart.items.find(i => i.productId === id)
    if (exists) {
      dispatch(updateQuantity(id, qty))
      announce('Quantity updated')
      return
    }
    // find product details to add a full item into cart
    const prod = products.find((p: any) => p.id === id)
    if (prod) {
      dispatch(addItem({ productId: id, title: prod.title, image: prod.image, price: prod.price, quantity: qty }))
      announce(`${prod.title} added to cart`)
    } else {
      // fallback
      dispatch(addItem({ productId: id, title: 'Product', image: '', price: 0, quantity: qty }))
      announce(`Product added to cart`)
    }
  }

  return (
    <section className="product-listing container">
      <div className="filters">
        <input aria-label="Search products" placeholder="Search" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}>
          <option value="">All Categories</option>
          {Array.isArray(categories) && categories.map((c: string) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="grid" role="list">
          {pageItems.map((p: any) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              image={p.image}
              quantity={getQty(p.id)}
              onChangeQuantity={handleChangeQty}
            />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={p => setPage(p)} />
    </section>
  )
}

export default ProductListing
