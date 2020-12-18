import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Text, HStack, Button, VStack } from '@chakra-ui/react';
import Cookies from 'cookies';

import { fetchGetJSON, fetchPostJSON } from '../utils/api-helpers';
import { useCart } from '../utils/cart';
import LayoutWithHeader from '../hoc/LayoutWithHeader';
import { useCheckoutSession } from '../utils/hooks';
import { useAuth } from '../lib/auth';
import fetcher from '../utils/fetcher';
import LayoutProdContainer from '../hoc/LayoutProdContainer';

type productType = {
  id: string;
  productName: string;
  cost: string;
  createdAt: string;
  description: string;
  img: string;
  rating: number;
  ownerId: string;
  map: any;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  const token = cookies.get('token');
  const ordersAll = await fetcher('http://localhost:3000/api/ordered', token);
  return {
    props: {
      ordersAll,
    },
  };
};

const Orders = ({ ordersAll }) => {
  const [productsOrdered, setProductsOrdered] = useState(null);
  const router = useRouter();
  const { cartItems } = useCart();
  const { user } = useAuth();

  const { data, error } = useCheckoutSession(router.query.session_id);

  if (error) return <Box>Failed to load</Box>;

  const orderAndRetrieve = async (cartItems, uid) => {
    console.log(cartItems, uid);
    const response = await fetchPostJSON('/api/ordering', {
      uid,
      orderedProducts: cartItems,
    });

    setProductsOrdered(response);
  };

  if (data && productsOrdered === null && user) {
    try {
      orderAndRetrieve(cartItems, user.uid);
    } catch (err) {
      console.log(err);
    }
  }

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
          <LayoutProdContainer title="All Orders" products={ordersAll} />
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
