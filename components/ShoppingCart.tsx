import {
  Flex,
  Box,
  Image,
  VStack,
  Text,
  HStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { useCart } from '../utils/cart';
import Rating from './Rating';

type productType = {
  id: string;
  productName: string;
  cost: number;
  createdAt: string;
  description: string;
  img: string;
  rating: number;
  quantity: number;
  ownerId: string;
  map: any;
};

const ShoppingCart: React.FC<productType> = ({
  productName,
  cost,
  createdAt,
  description,
  img,
  rating,
  quantity,
  ownerId,
  id,
}) => {
  const { removeCartItem } = useCart();

  const total = cost * quantity;

  return (
    <Flex w="100%" m="10px 0">
      <Box w={200}>
        <Image src={img} alt="item-image" />
      </Box>
      <Box flex={1}>
        <VStack alignItems="flex-start" h="100%">
          <Text fontSize="xl" fontWeight="700">
            {productName}
          </Text>
          <Text>
            Rating: <Rating rating={rating} />
          </Text>
          <Text>In Stock</Text>
          <Text>
            Sales start date: {format(Date.parse(createdAt), 'yyyy-MM-dd')}
          </Text>
          <Text>Description: {description}</Text>
          <HStack>
            <Button>Quantity: {quantity}</Button>
            <Divider orientation="vertical" alignSelf="stretch" h="auto" />
            <Button colorScheme="orange" onClick={() => removeCartItem(id)}>
              Delete
            </Button>
          </HStack>
        </VStack>
      </Box>
      <Text w={200} textAlign="right" fontSize="2xl" fontWeight={600}>
        {new Intl.NumberFormat('ko', {
          style: 'currency',
          currency: 'USD',
        }).format(total)}
      </Text>
    </Flex>
  );
};

export default ShoppingCart;
