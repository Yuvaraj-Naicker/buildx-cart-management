import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getCart = () => API.get('/cart');
export const addToCart = (product) => API.post('/cart/add', product);
export const removeFromCart = (itemId) => API.delete(`/cart/remove/${itemId}`);
export const updateQuantity = (itemId, quantity) =>
  API.put(`/cart/update/${itemId}`, { quantity });