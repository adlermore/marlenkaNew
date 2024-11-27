import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : [];
  }
  return [];
};

// Initial state, loading from localStorage (client-side)
const initialState = {
  items: [],
  totalAmount: 0,
};

// Helper function to calculate total amount
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.totalPrice, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart(state) {
      const cartData = loadCartFromLocalStorage();
      state.items = cartData;
      state.totalAmount = calculateTotalAmount(cartData);
    },
    addToCart(state, action) {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        toast.error(`${product.name} is already in your cart`);
      } else {
        // Add new item with initial quantity
        state.items.push({
          ...product,
          totalPrice: parseFloat(product.price) * product.quantity,
        });
        toast.success(`${product.name} added to your cart`);
      }

      // Update total amount
      state.totalAmount = calculateTotalAmount(state.items);

      // Save updated cart to localStorage
      saveCartToLocalStorage(state.items);
    },
    updateCartQuantity(state, action) {
      const { productId, amount } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);

      if (existingItemIndex >= 0) {
        const newQuantity = state.items[existingItemIndex].quantity + amount;

        if (newQuantity <= 0) {
          // Remove item if quantity is zero or less
          state.items.splice(existingItemIndex, 1);
          toast.success('Product removed from your cart');
        } else {
          // Update quantity and total price
          state.items[existingItemIndex].quantity = newQuantity;
          state.items[existingItemIndex].totalPrice = parseFloat(state.items[existingItemIndex].price) * newQuantity;
          // toast.success('Product quantity updated in your cart');
        }

        // Update total amount
        state.totalAmount = calculateTotalAmount(state.items);

        // Save updated cart to localStorage
        saveCartToLocalStorage(state.items);
      } else {
        toast.error('Item not found in your cart');
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload.id;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);

      if (existingItemIndex >= 0) {
        // Remove item from cart
        state.items.splice(existingItemIndex, 1);
        toast.success('Item removed from your cart');

        // Update total amount
        state.totalAmount = calculateTotalAmount(state.items);

        // Save updated cart to localStorage
        saveCartToLocalStorage(state.items);
      } else {
        toast.error('Item not found in your cart');
      }
    },
    resetCart(state) {
      state.items = [];
      state.totalAmount = 0;
      saveCartToLocalStorage([]); // Clear localStorage
      toast.success('Cart cleared');
    },
  },
});

// Dispatch initializeCart action on client-side
export const initializeCart = () => (dispatch) => {
  if (typeof window !== 'undefined') {
    dispatch(cartSlice.actions.initializeCart());
  }
};

export const { addToCart, updateCartQuantity, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
