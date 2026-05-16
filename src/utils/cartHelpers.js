// Calculate total price of all cart items
export const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// Format price to 2 decimal places
export const formatPrice = (amount) => `₹${amount.toFixed(2)}`;