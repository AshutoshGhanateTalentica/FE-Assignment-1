import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'

const Header: React.FC = () => {
  const count = useSelector((s: RootState) => s.cart.items.reduce((a, b) => a + b.quantity, 0))
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="brand"><Link to="/">E-Shop</Link></h1>
        <nav>
          <Link to="/cart" aria-label="Cart">
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
