import { useState, useEffect } from 'react';
import {
  getCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateQuantity as apiUpdateQuantity,
} from '../services/cartService';
import { calculateTotal } from '../utils/cartHelpers';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Persistent Cart: Load from localStorage first, then sync with API ───
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
    fetchCart();
  }, []);

  // ─── Persist to localStorage on every cart change ───
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ─── Fetch cart from PHP API ───
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      setCartItems(res.data.items || []);
    } catch (err) {
      // API not ready yet — fall back to localStorage silently
      console.warn('API unavailable, using local cart.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Add to Cart ───
  const addToCart = async (product) => {
    // Check if item already exists → just increase quantity
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      return updateQuantity(product.id, existing.quantity + 1);
    }

    // Optimistic UI update before API call
    const newItem = { ...product, quantity: 1 };
    setCartItems((prev) => [...prev, newItem]);

    try {
      await apiAddToCart(newItem);
    } catch (err) {
      // Rollback if API fails
      setCartItems((prev) => prev.filter((item) => item.id !== product.id));
      setError('Failed to add item. Please try again.');
    }
  };

  // ─── Remove Cart Item ───
  const removeFromCart = async (itemId) => {
    const previous = cartItems;

    // Optimistic UI update
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));

    try {
      await apiRemoveFromCart(itemId);
    } catch (err) {
      // Rollback if API fails
      setCartItems(previous);
      setError('Failed to remove item. Please try again.');
    }
  };

  // ─── Update Quantity ───
  const updateQuantity = async (itemId, newQuantity) => {
    // Remove item if quantity drops to 0
    if (newQuantity < 1) return removeFromCart(itemId);

    const previous = cartItems;

    // Optimistic UI update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await apiUpdateQuantity(itemId, newQuantity);
    } catch (err) {
      // Rollback if API fails
      setCartItems(previous);
      setError('Failed to update quantity. Please try again.');
    }
  };

  // ─── Clear error after 3 seconds ───
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    cartItems,
    loading,
    error,
    cartTotal: calculateTotal(cartItems),  // Cart total calculation
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    addToCart,
    removeFromCart,
    updateQuantity,
  };
};

export default useCart;