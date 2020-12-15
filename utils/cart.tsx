import { useContext, createContext, useState, useEffect } from 'react';

const cartContext = createContext(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useProvideCart();
  return <cartContext.Provider value={cart}>{children}</cartContext.Provider>;
}

export const useCart = () => {
  return useContext(cartContext);
};

function useProvideCart() {
  const [cartItems, setCartItems] = useState<cartItemsState[] | []>([]);
  const [cartItemsNumber, setCartItemsNumber] = useState<number>(0);
  const [cartItemsTotal, setCartItemsTotal] = useState<number>(0);

  const addCartItem = (values) => {
    const itemsUpdated = [...cartItems, values];
    setCartItems(itemsUpdated);
    localStorage.setItem('cartItems', JSON.stringify(itemsUpdated));
  };

  const resetCartItems = () => {
    setCartItems([]);
  };

  useEffect(() => {
    setCartItemsNumber(cartItems.length);
    if (cartItems.length === 0 && localStorage.getItem('cartItems')) {
      const items = JSON.parse(localStorage.getItem('cartItems'));
      setCartItems(items);
    }
    const subTotal = (cartItems as any[]).reduce(
      (accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.cost);
      },
      0
    );
    setCartItemsTotal(subTotal);
  }, [cartItems]);
  return {
    cartItems,
    cartItemsNumber,
    cartItemsTotal,
    addCartItem,
    resetCartItems,
  };
}

interface cartItemsState {
  productName: string;
  img: string;
  cost: number;
  description: string;
  rating: number;
  createdAt: string;
  id: string;
  ownerId: string;
}
