import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getCache, setCache } from '../utils/cacheManager'

describe('cacheManager', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('guardar y recuperar datos del cache', () => {
    const data = [{ id: '1', brand: 'Acer', model: 'X960' }]
    setCache('products', data)
    const result = getCache('products')
    expect(result).toEqual(data)
  })

  it('devolver null si no hay datos en cache', () => {
    const result = getCache('products')
    expect(result).toBeNull()
  })

  it('devolver null si el cache ha expirado', () => {
    const data = [{ id: '1', brand: 'Acer', model: 'X960' }]
    setCache('products', data)

    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 61 * 60 * 1000)

    const result = getCache('products')
    expect(result).toBeNull()

    vi.restoreAllMocks()
  })
})