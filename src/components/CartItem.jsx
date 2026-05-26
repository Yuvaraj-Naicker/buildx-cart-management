import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      {/* Product Image */}
      <img
        src={item.image || '/placeholder.png'}
        alt={item.name}
        className="cart-item__image"
      />

      {/* Product Info */}
      <div className="cart-item__details">
        <h3 className="cart-item__name">{item.name}</h3>
        <p className="cart-item__price">₹{item.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item__quantity">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Item Subtotal */}
      <p className="cart-item__subtotal">
        ₹{(item.price * item.quantity).toFixed(2)}
      </p>

      {/* Remove Button */}
      <button
        className="cart-item__remove"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        🗑
      </button>
    </div>
  );
};

export default CartItem;