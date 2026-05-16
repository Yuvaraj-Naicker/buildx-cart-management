import React from 'react';
import { formatPrice } from '../utils/cartHelpers';

const CartSummary = ({ cartTotal, cartCount }) => {
  const shipping = cartTotal > 500 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">Order Summary</h2>

      <div className="cart-summary__row">
        <span>Items ({cartCount})</span>
        <span>{formatPrice(cartTotal)}</span>
      </div>

      <div className="cart-summary__row">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
      </div>

      {shipping === 0 && (
        <p className="cart-summary__free-shipping">
          🎉 You qualify for free shipping!
        </p>
      )}

      <div className="cart-summary__divider" />

      <div className="cart-summary__row cart-summary__total">
        <span>Grand Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>

      <button className="cart-summary__checkout">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;