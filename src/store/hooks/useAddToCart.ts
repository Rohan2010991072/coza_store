import { useAppDispatch } from '@/store/hooks';
import { addItem, openCart } from '@/store/slices/cartSlice';

export const useAddToCart = () => {
  const dispatch = useAppDispatch();

  const addToCart = (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    size?: string;
    color?: string;
  }, openCartSidebar = true) => {
    dispatch(addItem(product));
    
    if (openCartSidebar) {
      dispatch(openCart());
    }
  };

  return { addToCart };
};