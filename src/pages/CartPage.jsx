import React from 'react';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import useCart from '../hooks/useCart';
import { toast } from 'react-toastify';
// ─── Mock Products (remove when PHP API is ready) ───
const MOCK_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 1299, image: 'https://picsum.photos/seed/headphones/80/80' },
  { id: 2, name: 'Mechanical Keyboard', price: 2499, image: 'https://picsum.photos/seed/keyboard/80/80' },
  { id: 3, name: 'USB-C Hub', price: 899,  image: 'https://picsum.photos/seed/hub/80/80' },
];

const CartPage = () => {
  const {
    cartItems, loading, error,
    cartTotal, cartCount,
    addToCart, removeFromCart, updateQuantity,
  } = useCart();

  React.useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="spinner" />
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* ─── Mock Product Buttons for Testing ─── */}
      <div className="mock-products">
        <p className="mock-products__label">🧪 Test — Add Products to Cart:</p>
        <div className="mock-products__list">
          {MOCK_PRODUCTS.map((product) => (
            <button
              key={product.id}
              className="mock-products__btn"
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} added to cart!`);
              }}
            >
              + {product.name} (₹{product.price})
            </button>
          ))}
        </div>
      </div>

      <h1 className="cart-page__title">
        Your Cart {cartCount > 0 && `(${cartCount} items)`}
      </h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty__icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started.</p>
        </div>
      ) : (
        <div className="cart-page__layout">
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
          <CartSummary cartTotal={cartTotal} cartCount={cartCount} />
        </div>
      )}
    </div>
  );
};

export default CartPage;