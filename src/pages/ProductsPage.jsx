import React from 'react';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 1299, category: 'Electronics',
    image: 'https://picsum.photos/seed/headphones/300/200' },
  { id: 2, name: 'Mechanical Keyboard', price: 2499, category: 'Electronics',
    image: 'https://picsum.photos/seed/keyboard/300/200' },
  { id: 3, name: 'USB-C Hub',           price: 899,  category: 'Electronics',
    image: 'https://picsum.photos/seed/usbhub/300/200' },
  { id: 4, name: 'Running Shoes',       price: 1899, category: 'Fashion',
    image: 'https://picsum.photos/seed/shoes/300/200' },
  { id: 5, name: 'Backpack',            price: 1199, category: 'Fashion',
    image: 'https://picsum.photos/seed/backpack/300/200' },
  { id: 6, name: 'Water Bottle',        price: 499,  category: 'Lifestyle',
    image: 'https://picsum.photos/seed/bottle/300/200' },
];

const ProductsPage = () => {
  const { addToCart, cartItems } = useCart();

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="products-page">
      <h1 className="products-page__title">All Products</h1>

      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-card__image"
              loading="lazy"
              width="300"
              height="200"
            />
            <div className="product-card__body">
              <span className="product-card__category">{product.category}</span>
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__price">₹{product.price.toLocaleString()}</p>
              <button
                className={`product-card__btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} added to cart! 🛒`);
                }}
              >
                {isInCart(product.id) ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;