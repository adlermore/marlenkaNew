import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Helper function to save wishlist to localStorage
const saveWishlistToLocalStorage = (wishlist) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
};

// Helper function to load wishlist from localStorage
const loadWishlistFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const serializedWishlist = localStorage.getItem('wishlist');
    return serializedWishlist ? JSON.parse(serializedWishlist) : [];
  }
  return [];
};

// Initial state, loading from localStorage (client-side)
const initialState = {
  items: [],
};

// Wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    initializeWishlist(state) {
      const wishlistData = loadWishlistFromLocalStorage();
      state.items = wishlistData;
    },
    addToWishlist(state, action) {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // If item exists, show a message that it is already in the wishlist
        toast(`${product.name} is already in your wishlist`);
      } else {
        // If item doesn't exist, add it to the wishlist
        state.items.push(product);
        toast.success(`${product.name} added to your wishlist`);
      }

      // Save updated wishlist to localStorage
      saveWishlistToLocalStorage(state.items);
    },
    removeFromWishlist(state, action) {
      const productId = action.payload.id;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);

      if (existingItemIndex >= 0) {
        // Remove item from wishlist
        state.items.splice(existingItemIndex, 1);
        toast.success('Item removed from your wishlist');
        
        // Save updated wishlist to localStorage
        saveWishlistToLocalStorage(state.items);
      } else {
        toast.error('Item not found in your wishlist');
      }
    },
    resetWishlist(state) {
      state.items = [];
      saveWishlistToLocalStorage([]); // Clear localStorage
      toast.success('Wishlist cleared');
    },
  },
});

// Dispatch initializeWishlist action on client-side
export const initializeWishlist = () => (dispatch) => {
  if (typeof window !== 'undefined') {
    dispatch(wishlistSlice.actions.initializeWishlist());
  }
};

export const { addToWishlist, removeFromWishlist, resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
