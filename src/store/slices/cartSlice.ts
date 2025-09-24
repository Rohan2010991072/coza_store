import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
  shipping: 0,
  tax: 0,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        (item) => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeItem: (state, action: PayloadAction<{ id: string; size?: string; color?: string }>) => {
      state.items = state.items.filter(
        (item) => !(
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
        )
      );
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (
      state, 
      action: PayloadAction<{ id: string; size?: string; color?: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (item) => !(
              item.id === action.payload.id && 
              item.size === action.payload.size && 
              item.color === action.payload.color
            )
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      cartSlice.caseReducers.calculateTotals(state);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    setShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      state.tax = state.total * 0.08; // 8% tax
      state.grandTotal = state.total + state.shipping + state.tax;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  setShipping,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;