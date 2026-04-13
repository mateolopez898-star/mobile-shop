import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/api.js'

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
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Lista de productos</h2>
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem', width: '250px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', cursor: 'pointer' }}
          >
            <img src={product.imgUrl} alt={product.model} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <p><strong>{product.brand}</strong></p>
            <p>{product.model}</p>
            <p>{product.price} €</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList