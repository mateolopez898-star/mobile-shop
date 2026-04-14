import { Link, useLocation} from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

function Header() {
  const { cartCount } = useCart()
  const location = useLocation()
  const isDetail = location.pathname.startsWith('/product/')

  return (
    <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ margin: 0 }}>Mobile Shop</h1>
        </Link>
        <div>🛒 <span>{cartCount}</span></div>
      </div>
      <nav style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
        <Link to="/" style={{ color: '#666' }}>Inicio</Link>
        {isDetail && (
          <>
            <span style={{ margin: '0 0.5rem', color: '#666' }}>/</span>
            <span>Detalle del producto</span>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header