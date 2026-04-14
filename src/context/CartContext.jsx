import { useState } from 'react'
import { CartContext } from './CartContextValue.js'

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0)

  const updateCartCount = (count) => {
    setCartCount(count)
  }

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  )
}