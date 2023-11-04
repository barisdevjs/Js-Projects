import  { useContext } from 'react';
import { ShoppingCartContext } from './Context';

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
