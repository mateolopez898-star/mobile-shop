import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Header() {
  const { cartCount } = useCart()

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Mobile Shop</h1>
      </Link>
      <div>
        🛒 <span>{cartCount}</span>
      </div>
    </header>
  )
}

export default Header