import { Box } from '@chakra-ui/react';

import Header from '../components/Header';

const LayoutWithHeader: React.FC = ({ children }) => (
  <Box bg="#EAEDED" minH="100vh">
    <Header />
    <main style={{ margin: '0 35px', minHeight: '100%' }}>{children}</main>
  </Box>
);

export default LayoutWithHeader;
