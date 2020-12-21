import { Box, HStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

import LayoutWithHeader from '../hoc/LayoutWithHeader';
import { useCart } from '../utils/cart';
import { fetchPostJSON } from '../utils/api-helpers';
import getStripe from '../utils/get-stripejs';
import LayoutProdContainer from '../hoc/LayoutProdContainer';

const Cart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { cartItems, cartItemsTotal, cartItemsNumber } = useCart();

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: cartItemsTotal,
    });
    if (response.statusCode === 500) {
      console.error(response.messsage);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <LayoutWithHeader>
      <HStack spacing={8}>
        <LayoutProdContainer title="Shopping Cart" products={cartItems} />
        <Box w="300px" pos="relative" alignSelf="flex-start">
          <Box
            pos="absolute"
            top="10px"
            right="0"
            w="100%"
            bgColor="white"
            p="20px"
          >
            <Text fontSize="xl" display="inline-block">
              Subtotal ({cartItemsNumber} items): &nbsp;
            </Text>
            <Text fontSize="xl" fontWeight={600} display="inline-block">
              {new Intl.NumberFormat('ko', {
                style: 'currency',
                currency: 'USD',
              }).format(cartItemsTotal)}
            </Text>
            <Button
              colorScheme="yellow"
              w="100%"
              mt="20px"
              onClick={handleCheckout}
              disabled={loading}
            >
              Process to Checkout
            </Button>
          </Box>
        </Box>
      </HStack>
    </LayoutWithHeader>
  );
};

export default Cart;
