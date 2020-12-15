import {
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
  Button,
  Image,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import Rating from '../components/Rating';

import LayoutWithHeader from '../hoc/LayoutWithHeader';
import { useCart } from '../utils/cart';
const Cart = () => {
  const { cartItems, cartItemsTotal, cartItemsNumber } = useCart();

  return (
    <LayoutWithHeader>
      <HStack spacing={8}>
        <VStack flex={1} bgColor="white" alignItems="flex-start" mt={8} p={5}>
          <Flex justify="space-between" w="100%">
            <Text fontSize="3xl" fontWeight={600}>
              Shopping Cart
            </Text>
            <Text alignSelf="flex-end">Price</Text>
          </Flex>
          <Divider />
          {cartItems.map((item: productType) => (
            <>
              <ItemContainer {...item} />
              <Divider />
            </>
          ))}
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
            <Text fontSize="xl" display="inline-block">
              Subtotal ({cartItemsNumber} items): &nbsp;
            </Text>
            <Text fontSize="xl" fontWeight={600} display="inline-block">
              ${cartItemsTotal}
            </Text>
            <Button colorScheme="yellow" w="100%" mt="20px">
              Process to Checkout
            </Button>
          </Box>
        </Box>
      </HStack>
    </LayoutWithHeader>
  );
};

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

const ItemContainer: React.FC<productType> = ({
  productName,
  cost,
  createdAt,
  description,
  img,
  rating,
  ownerId,
}) => (
  <Flex w="100%">
    <Box w={200}>
      <Image src={img} alt="item-image" />
    </Box>
    <Box flex={1}>
      <VStack alignItems="flex-start" h="100%">
        <Text fontSize="xl" fontWeight="700">
          {productName}
        </Text>
        <Text>In Stock</Text>
        <Text>
          Sales start date: {format(Date.parse(createdAt), 'yyyy-MM-dd')}
        </Text>
        <Text>Description: {description}</Text>
        <Text>
          Rating: <Rating rating={rating} />
        </Text>
        <HStack>
          <Button>Quantity: 0</Button>
          <Divider orientation="vertical" alignSelf="stretch" h="auto" />
          <Button colorScheme="orange">Delete</Button>
        </HStack>
      </VStack>
    </Box>
    <Text w={200} textAlign="right" fontSize="2xl" fontWeight={600}>
      ${cost}
    </Text>
  </Flex>
);

export default Cart;
