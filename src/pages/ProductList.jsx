import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/api.js'
import styles from './ProductList.module.css'

function ProductList() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered = products.filter((p) =>
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.model.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p style={{ padding: '2rem' }}>Cargando productos...</p>

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <h2 className={styles.title}>Lista de productos</h2>
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>
      <div className={styles.grid}>
          {filtered.length === 0 ? (
          <p className={styles.noResults}>No se encontraron productos</p>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className={styles.card}
            >
            <img src={product.imgUrl} alt={product.model} className={styles.image} />
            <p className={styles.brand}><strong>{product.brand}</strong></p>
            <p className={styles.model}>{product.model}</p>
            <p className={styles.price}>{product.price} €</p>
          </div>
        ))
        )}
      </div>
    </div>
  )
}

export default ProductList