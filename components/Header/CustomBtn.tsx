import { Button } from '@chakra-ui/react';

const CustomBtn: React.FC = ({ children }) => (
  <Button
    bgColor="black"
    color="white"
    border="1px solid black"
    _hover={{ backgroundColor: 'black', border: '1px solid white' }}
    _focus={{ backgroundColor: 'black' }}
    _active={{ backgroundColor: 'black' }}
    animation="none"
    h="100%"
  >
    {children}
  </Button>
);

export default CustomBtn;
