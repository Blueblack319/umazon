import { useContext, createContext, useState, useEffect } from 'react';

const checkoutContext = createContext(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const checkout = useProvideCheckout();
  return (
    <checkoutContext.Provider value={checkout}>
      {children}
    </checkoutContext.Provider>
  );
}

export const useCheckout = () => {
  return useContext(checkoutContext);
};

function useProvideCheckout() {
  const [checkoutItems, setCheckoutItems] = useState<checkoutItemsState[] | []>(
    []
  );
  const [checkoutItemsNumber, setCheckoutItemsNumber] = useState<number>(0);

  const addCheckoutItem = (values) => {
    const itemsUpdated = [...checkoutItems, values];
    setCheckoutItems(itemsUpdated);
    localStorage.setItem('checkoutItems', JSON.stringify(itemsUpdated));
  };

  useEffect(() => {
    setCheckoutItemsNumber(checkoutItems.length);
    if (checkoutItems.length === 0 && localStorage.getItem('checkoutItems')) {
      const items = JSON.parse(localStorage.getItem('checkoutItems'));
      setCheckoutItems(items);
    }
  }, [checkoutItems]);

  return { checkoutItems, checkoutItemsNumber, addCheckoutItem };
}

interface checkoutItemsState {
  productName: string;
  img: string;
  cont: number;
  description: string;
  rating: number;
  createdAt: string;
  id: string;
  ownerId: string;
}
