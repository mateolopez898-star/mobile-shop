import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, addToCart } from '../services/api.js'
import { useCart } from '../context/CartContext.jsx'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateCartCount } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedStorage, setSelectedStorage] = useState('')

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data)
      if (data.options?.colors?.length > 0) setSelectedColor(data.options.colors[0].code)
      if (data.options?.storages?.length > 0) setSelectedStorage(data.options.storages[0].code)
      setLoading(false)
    })
  }, [id])

  const handleAddToCart = async () => {
    const result = await addToCart(id, selectedColor, selectedStorage)
    updateCartCount(result.count)
  }

  if (loading) return <p style={{ padding: '2rem' }}>Cargando producto...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
        ← Volver al listado
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img src={product.imgUrl} alt={product.model} style={{ width: '100%', objectFit: 'contain', maxHeight: '400px' }} />
        </div>
        <div>
          <h2>{product.brand} {product.model}</h2>
          <p><strong>Precio:</strong> {product.price} €</p>
          <p><strong>CPU:</strong> {product.cpu}</p>
          <p><strong>RAM:</strong> {product.ram}</p>
          <p><strong>Sistema operativo:</strong> {product.os}</p>
          <p><strong>Resolución:</strong> {product.displayResolution}</p>
          <p><strong>Batería:</strong> {product.battery}</p>
          <p><strong>Cámaras:</strong> {product.primaryCamera} / {product.secondaryCmera}</p>
          <p><strong>Dimensiones:</strong> {product.dimentions}</p>
          <p><strong>Peso:</strong> {product.weight} g</p>

          <div style={{ marginTop: '1rem' }}>
            <label><strong>Color:</strong></label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} style={{ display: 'block', marginTop: '0.5rem', padding: '0.5rem', width: '100%' }}>
              {product.options.colors.map((color) => (
                <option key={color.code} value={color.code}>{color.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label><strong>Almacenamiento:</strong></label>
            <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)} style={{ display: 'block', marginTop: '0.5rem', padding: '0.5rem', width: '100%' }}>
              {product.options.storages.map((storage) => (
                <option key={storage.code} value={storage.code}>{storage.name}</option>
              ))}
            </select>
          </div>

          <button onClick={handleAddToCart} style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', cursor: 'pointer', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail