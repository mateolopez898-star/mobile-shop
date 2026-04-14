import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, addToCart } from '../services/api.js'
import { useCart } from '../hooks/useCart.js'
import styles from './ProductDetail.module.css'

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
    <div className={styles.container}>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        ← Volver al listado
      </button>
      <div className={styles.grid}>
        <div className={styles.imageContainer}>
          <img src={product.imgUrl} alt={product.model} className={styles.image} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{product.brand} {product.model}</h2>
          <p className={styles.spec}><strong>Precio:</strong> {product.price} €</p>
          <p className={styles.spec}><strong>CPU:</strong> {product.cpu}</p>
          <p className={styles.spec}><strong>RAM:</strong> {product.ram}</p>
          <p className={styles.spec}><strong>Sistema operativo:</strong> {product.os}</p>
          <p className={styles.spec}><strong>Resolución:</strong> {product.displayResolution}</p>
          <p className={styles.spec}><strong>Batería:</strong> {product.battery}</p>
          <p className={styles.spec}><strong>Cámaras:</strong> {product.primaryCamera} / {product.secondaryCmera}</p>
          <p className={styles.spec}><strong>Dimensiones:</strong> {product.dimentions}</p>
          <p className={styles.spec}><strong>Peso:</strong> {product.weight} g</p>

           <div className={styles.actions}>
            <div>
              <label className={styles.selectLabel}>Color</label>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className={styles.select}>
                {product.options.colors.map((color) => (
                  <option key={color.code} value={color.code}>{color.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={styles.selectLabel}>Almacenamiento</label>
              <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)} className={styles.select}>
                {product.options.storages.map((storage) => (
                  <option key={storage.code} value={storage.code}>{storage.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleAddToCart} className={styles.addButton}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail