import { Button, Text, Image, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useCheckout } from '../utils/checkout';

import Rating from './Rating';

const ItemForSale = ({ values }: any) => {
  const checkout = useCheckout();
  const {
    productName,
    img,
    cost,
    description,
    rating,
    createdAt,
    id,
    ownerId,
  } = values;

  const AddBtnOnClick = async () => {
    await checkout.addCheckoutItem(values);
  };

  return (
    <Flex p="10px 20px" minW="350px" minH="400px" bg="white" flexDir="column">
      <Text fontSize="2xl" mb="10px">
        {productName}
      </Text>
      <Image
        w={200}
        objectFit="contain"
        src={img}
        alt="example"
        alignSelf="center"
      />
      <Text>Cost: ${cost}</Text>
      <Text>
        Rating: <Rating rating={rating} />
      </Text>
      <Text>Stock</Text>
      <Text>
        Sales start date: {format(Date.parse(createdAt), 'yyyy-MM-dd')}
      </Text>
      <Button colorScheme="orange" onClick={AddBtnOnClick.bind(values)}>
        Add to Bucket
      </Button>
    </Flex>
  );
};

export default ItemForSale;
