import {
  Flex,
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  Button,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon, StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';

import CustomBtn from './CustomBtn';
import { useAuth } from '../lib/auth';
import { useCart } from '../utils/cart';
import SellModal from './SellModal';

const searchOptions = (
  <Select
    placeholder="All"
    borderTopRightRadius="0"
    borderBottomRightRadius="0"
    w="80px"
    _focus={{ boxShadow: '0 0 0 3px orange' }}
    zIndex={100}
  >
    <option value="all">All</option>
    <option value="arts">Arts</option>
    <option value="books">Books</option>
    <option value="computers">Computers</option>
    <option value="electronics">Electronics</option>
  </Select>
);

const Header: React.FC = () => {
  const router = useRouter();
  const auth = useAuth();
  const cart = useCart();
  const { cartItemsNumber } = useCart();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputFocused = () => {
    setIsFocus(true);
  };
  const handleInputBlurred = () => {
    setIsFocus(false);
  };
  const handleLogoClicked = () => {
    router.push('/');
  };

  const handleLogoutOnClick = () => {
    localStorage.removeItem('cartItems');
    cart.resetCartItems();
    auth.signout();
  };

  return (
    <>
      <Flex
        align="center"
        h="60px"
        bgColor="black"
        justify="space-between"
        p="5px 10px"
      >
        <Box
          h="50px"
          minW="170px"
          p="0 20px"
          m="0 10px"
          bgColor="black"
          color="white"
          border="1px solid black"
          cursor="pointer"
          _hover={{ border: '1px solid white', borderRadius: '3px' }}
          onClick={handleLogoClicked}
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG2AwepbH0wji4lVTKbCDhoiSMXCLeNIgcog&usqp=CAU"
            alt="logo"
            h="48px"
            minW="130px"
          />
        </Box>
        <InputGroup
          m="0 10px"
          borderRadius="6px"
          boxShadow={isFocus ? '0 0 0 3px orange' : 'none'}
        >
          <InputLeftAddon p="0" children={searchOptions} />
          <Input
            size="20px"
            outline="none"
            bgColor="white"
            _focus={{ outline: 'none' }}
            onFocus={handleInputFocused}
            onBlur={handleInputBlurred}
          />
          <InputRightAddon
            p="0"
            border="0"
            children={
              <IconButton
                backgroundColor="orange.200"
                aria-label="Search database"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                border="0"
                _hover={{
                  backgroundColor: 'orange.400',
                }}
                _focus={{
                  backgroundColor: 'orange.400',
                  boxShadow: '0 0 0 3px orange',
                }}
                _active={{
                  backgroundColor: 'orange.400',
                }}
                icon={<SearchIcon />}
              />
            }
          />
        </InputGroup>
        <Stack direction="row" spacing={1} align="center" h="100%">
          <CustomBtn
            clicked={() => {
              Cookies.get('umazon-auth')
                ? router.push('/account')
                : router.push('/signin');
            }}
          >
            <Stack spacing={0} align="baseline">
              <Text fontWeight={400} fontSize={13}>
                Hello, {Cookies.get('umazon-auth') ? 'User' : 'Sign in'}
              </Text>
              <Text fontWeight={600}>Account & Lists</Text>
            </Stack>
          </CustomBtn>

          <CustomBtn
            clicked={() =>
              Cookies.get('umazon-auth')
                ? router.push('/orders')
                : router.push('/signin')
            }
          >
            <Stack spacing={0} align="baseline">
              <Text fontWeight={400} fontSize={13}>
                returns
              </Text>
              <Text fontWeight={600}>& Orders</Text>
            </Stack>
          </CustomBtn>

          <CustomBtn>
            <Link href={Cookies.get('umazon-auth') ? '/cart' : '/signin'}>
              <a>Cart: {cartItemsNumber}+</a>
            </Link>
          </CustomBtn>
          <CustomBtn clicked={onOpen}>
            <Text fontWeight={600}>Sell Item</Text>
          </CustomBtn>
          <Button colorScheme="red" onClick={handleLogoutOnClick}>
            Log out
          </Button>
        </Stack>
      </Flex>
      <SellModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
