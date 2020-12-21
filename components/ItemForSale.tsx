import {
  Button,
  Text,
  Image,
  Flex,
  useDisclosure,
  HStack,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

import { useCart } from '../utils/cart';

import Rating from './Rating';
import SellModal from './SellModal';
import CustomAlertDialog from '../components/CustomAlertDialog';

const ItemForSale = ({ values }) => {
  const cart = useCart();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const quantityRef = useRef(null);
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
    values['quantity'] = parseInt(quantityRef.current.value);
    await cart.addCartItem(values);
  };
  const displayStock =
    quantity === 0 ? <Text>Out of Stock</Text> : <Text>In Stock</Text>;

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
        {router.pathname === '/account' ? (
          <Text color="red">Quantity: {quantity}</Text>
        ) : (
          displayStock
        )}
        <Text>
          Sales start date: {format(Date.parse(createdAt), 'yyyy-MM-dd')}
        </Text>
        {router.pathname === '/account' ? (
          <>
            <Button colorScheme="yellow" onClick={onOpen} mb="10px">
              Edit Item
            </Button>
            <CustomAlertDialog productId={id} ownerId={ownerId} />
          </>
        ) : (
          <HStack>
            <NumberInput defaultValue={0} min={0} max={quantity} step={1}>
              <NumberInputField ref={quantityRef} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Button colorScheme="orange" onClick={addBtnOnClick.bind(values)}>
              Add to Bucket
            </Button>
          </HStack>
        )}
      </Flex>
      <SellModal isOpen={isOpen} onClose={onClose} values={values} />
    </>
  );
};

export default ItemForSale;
