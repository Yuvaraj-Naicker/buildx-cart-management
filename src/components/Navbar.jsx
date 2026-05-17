import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar__container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          🛍️ ShopX
        </Link>

        {/* Nav Links */}
        <div className="navbar__links">
          <Link to="/" className="navbar__link">
            Products
          </Link>
          <Link to="/cart" className="navbar__link">
            Cart
          </Link>
        </div>

        {/* Cart Icon with Badge */}
        <Link to="/cart" className="navbar__cart" aria-label="Go to cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartCount > 0 && (
            <span className="navbar__badge">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;