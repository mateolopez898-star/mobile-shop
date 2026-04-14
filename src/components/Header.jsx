import { Link, useLocation} from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import styles from './Header.module.css'

function Header() {
  const { cartCount } = useCart()
  const location = useLocation()
  const isDetail = location.pathname.startsWith('/product/')

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link to="/" className={styles.logo}>
          Mobile Shop
        </Link>
         <div className={styles.cart}>
          🛒
          <span className={styles.cartCount}>{cartCount}</span>
        </div>
      </div>
      <nav className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
        {isDetail && (
          <>
            <span className={styles.separator}>/</span>
            <span>Detalle del producto</span>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header