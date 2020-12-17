import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Box } from '@chakra-ui/react';
import useSWR from 'swr';

import { fetchGetJSON, fetchPostJSON } from '../utils/api-helpers';
import { useCart } from '../utils/cart';

const Orders: NextPage = () => {
  const [productsOrdered, setProductsOrdered] = useState(null);
  const router = useRouter();
  const { cartItems } = useCart();
  const user = Cookies.getJSON('user');

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <Box>Failed to load</Box>;

  const orderAndRetrieve = async (cartItems, uid) => {
    const response = await fetchPostJSON('/api/ordering', {
      uid,
      orderedProducts: cartItems,
    });
    console.log(response);
    setProductsOrdered(response);
  };

  if (data && productsOrdered === null) {
    try {
      orderAndRetrieve(cartItems, user.uid);
    } catch (err) {
      console.log(err);
    }
  }

  return <Box>orders</Box>;
};

export default Orders;
