import { useContext } from 'react'
import { CartContext } from '../context/CartContextValue.js'

export const useCart = () => useContext(CartContext)