import { getCache, setCache } from '../utils/cacheManager';

const BASE_URL = 'https://itx-frontend-test.onrender.com';

export const getProducts = async () => {
  const cached = getCache('products');
  if (cached) return cached;
  const res = await fetch(`${BASE_URL}/api/product`);
  const data = await res.json();
  setCache('products', data);
  return data;
};

export const getProductById = async (id) => {
  const cached = getCache(`product_${id}`);
  if (cached) return cached;
  const res = await fetch(`${BASE_URL}/api/product/${id}`);
  const data = await res.json();
  setCache(`product_${id}`, data);
  return data;
};

export const addToCart = async (id, colorCode, storageCode) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
  return res.json();
};