import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === newItem.id);
        
        if (existingItem) {
          // Update quantity if item already exists
          set(state => {
            const updatedItems = state.items.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                : item
            );
            
            return {
              items: updatedItems,
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
              totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            };
          });
        } else {
          // Add new item
          const itemToAdd: CartItem = {
            ...newItem,
            quantity: newItem.quantity || 1
          };
          
          set(state => {
            const updatedItems = [...state.items, itemToAdd];
            
            return {
              items: updatedItems,
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
              totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            };
          });
        }
      },

      removeItem: (id) => {
        set(state => {
          const updatedItems = state.items.filter(item => item.id !== id);
          
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set(state => {
          const updatedItems = state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          );
          
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);