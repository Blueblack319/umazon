import { Box } from '@chakra-ui/react';

const ItemBox: React.FC = ({ children }: React.ReactNode) => (
  <Box bg="white" h="400px">
    {children}
  </Box>
);

export default ItemBox;
