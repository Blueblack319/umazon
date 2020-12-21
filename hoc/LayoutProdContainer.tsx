import { VStack, Flex, Divider, Text, Box } from '@chakra-ui/react';
import ShoppingCart from '../components/ShoppingCart';

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

interface LayoutProdContainerProps {
  products: productType[];
  title: string;
}

const LayoutProdContainer: React.FC<LayoutProdContainerProps> = ({
  products,
  title,
}) => {
  let keyCount = 0;
  const getKey = () => {
    return keyCount++;
  };

  return (
    <VStack
      flex={1}
      bgColor="white"
      alignItems="flex-start"
      mt={8}
      p={5}
      w="100%"
    >
      <Flex justify="space-between" w="100%">
        <Text fontSize="3xl" fontWeight={600}>
          {title}
        </Text>
        <Text alignSelf="flex-end">Price</Text>
      </Flex>
      <Divider />
      {products.map((item: productType) => (
        <Box key={getKey()} w="100%">
          <ShoppingCart {...item} />
          <Divider />
        </Box>
      ))}
    </VStack>
  );
};

export default LayoutProdContainer;
