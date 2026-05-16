import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import useCart from '../hooks/useCart';

const CartPage = () => {
  const {
    cartItems,
    loading,
    error,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Show toast on error from hook
  React.useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // ─── Loading State ───
  if (loading) {
    return (
      <div className="cart-loading">
        <div className="spinner" />
        <p>Loading your cart...</p>
      </div>
    );
  }

  // ─── Empty State ───
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty__icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started.</p>
        <button className="btn-primary" onClick={() => window.history.back()}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="cart-page__title">Your Cart ({cartCount} items)</h1>

      <div className="cart-page__layout">
        {/* Cart Items List */}
        <div className="cart-page__items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={(id) => {
                removeFromCart(id);
                toast.success('Item removed from cart');
              }}
              onUpdateQuantity={(id, qty) => {
                updateQuantity(id, qty);
                toast.info('Cart updated');
              }}
            />
          ))}
        </div>

        {/* Order Summary */}
        <CartSummary cartTotal={cartTotal} cartCount={cartCount} />
      </div>
    </div>
  );
};

export default CartPage;