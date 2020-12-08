import {
  Flex,
  Spacer,
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  IconButton,
  Stack,
  Button,
  Text,
  border,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

import CustomBtn from './CustomBtn';

interface HeaderProps {}

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

const Header: React.FC<HeaderProps> = () => {
  const [isFocus, setIsFocus] = useState(false);

  const handleInputFocused = () => {
    setIsFocus(true);
  };
  const handleInputBlurred = () => {
    setIsFocus(false);
  };

  return (
    <Flex
      align="center"
      h="60px"
      bgColor="black"
      justify="space-between"
      p="5px 10px"
    >
      <Box
        h="50px"
        w="150px"
        m="0 20px 0 10px"
        bgColor="black"
        color="white"
        border="1px solid black"
        cursor="pointer"
      >
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG2AwepbH0wji4lVTKbCDhoiSMXCLeNIgcog&usqp=CAU"
          alt="logo"
          h="48px"
          w="130px"
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
        <CustomBtn>
          <Stack spacing={0} align="baseline">
            <Text fontWeight={400} fontSize={13}>
              Hello, Sign in
            </Text>
            <Text fontWeight={600}>Account & Lists</Text>
          </Stack>
        </CustomBtn>

        <CustomBtn>
          <Stack spacing={0} align="baseline">
            <Text fontWeight={400} fontSize={13}>
              returns
            </Text>
            <Text fontWeight={600}>& Orders</Text>
          </Stack>
        </CustomBtn>

        <CustomBtn>Cart: 0+</CustomBtn>
      </Stack>
    </Flex>
  );
};

export default Header;
