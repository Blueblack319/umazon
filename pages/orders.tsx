import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Text, HStack, VStack } from '@chakra-ui/react';
import Cookies from 'cookies';

import { fetchPostJSON } from '../utils/api-helpers';
import { useCart } from '../utils/cart';
import LayoutWithHeader from '../hoc/LayoutWithHeader';
import { useCheckoutSession } from '../utils/hooks';
import fetcher from '../utils/fetcher';
import LayoutProdContainer from '../hoc/LayoutProdContainer';
import { auth } from '../lib/firebase-admin';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  const token = cookies.get('token');
  const { uid } = await auth.verifyIdToken(token);
  if (ctx.query.session_id) {
  }
  const ordersAll = await fetcher('http://localhost:3000/api/ordered', token);
  return {
    props: {
      ordersAll,
      uid,
    },
  };
};

const Orders = ({ ordersAll, uid }) => {
  const [productsOrdered, setProductsOrdered] = useState(null);
  const router = useRouter();
  const { cartItems, resetCartItems } = useCart();

  const { data, error } = useCheckoutSession(router.query.session_id);

  if (error) return <Box>Failed to load</Box>;

  const orderAndRetrieve = async (cartItems, uid) => {
    await fetchPostJSON('/api/ordering', {
      uid,
      orderedProducts: cartItems,
    })
      .then((res) => {
        localStorage.removeItem('cartItems');
        resetCartItems();
        setProductsOrdered(res);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
  useEffect(() => {
    if (data && productsOrdered === null && cartItems) {
      try {
        orderAndRetrieve(cartItems, uid);
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }, [data]);

  return (
    <LayoutWithHeader>
      <HStack spacing={8}>
        <VStack flex={1} w="100%">
          {productsOrdered ? (
            <LayoutProdContainer
              title="Shipping Orders"
              products={productsOrdered}
            />
          ) : null}
          {ordersAll.length !== 0 ? (
            <LayoutProdContainer title="All Orders" products={ordersAll} />
          ) : null}
        </VStack>
        <Box w="300px" pos="relative" alignSelf="flex-start">
          <Box
            pos="absolute"
            top="10px"
            right="0"
            w="100%"
            bgColor="white"
            p="20px"
          >
            <Text fontSize="2xl">Wow...Great orders!! </Text>
          </Box>
        </Box>
      </HStack>
    </LayoutWithHeader>
  );
};

export default Orders;
