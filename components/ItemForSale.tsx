import { Button, Text, Image, Flex, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

import { useCart } from '../utils/cart';

import Rating from './Rating';
import SellModal from './SellModal';

const ItemForSale = ({ values }) => {
  const cart = useCart();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    productName,
    img,
    cost,
    description,
    rating,
    createdAt,
    quantity,
    id,
    ownerId,
  } = values;

  const addBtnOnClick = async () => {
    await cart.addCartItem(values);
  };

  return (
    <>
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
        <Text>Description: {description}</Text>
        {quantity > 10 ? (
          <Text>In stock</Text>
        ) : (
          <Text color="red">Less than 10</Text>
        )}
        <Text>
          Sales start date: {format(Date.parse(createdAt), 'yyyy-MM-dd')}
        </Text>
        {router.pathname === '/account' ? (
          <Button colorScheme="yellow" onClick={onOpen}>
            Edit Item
          </Button>
        ) : (
          <Button colorScheme="orange" onClick={addBtnOnClick.bind(values)}>
            Add to Bucket
          </Button>
        )}
      </Flex>
      <SellModal isOpen={isOpen} onClose={onClose} values={values} />
    </>
  );
};

export default ItemForSale;
