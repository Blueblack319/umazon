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

import Rating from './Rating';

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
  <Flex w="100%" m="10px 0">
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

export default ItemContainer;
