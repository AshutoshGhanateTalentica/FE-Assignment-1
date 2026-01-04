import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductListing from './pages/ProductListing/Container'
import ProductDetails from './pages/ProductDetails/Container'
import CartPage from './pages/Cart/Container'
import Header from './components/Header/Header'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
