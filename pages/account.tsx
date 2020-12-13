import { Box, Text, Grid, Image } from '@chakra-ui/react';
import useSWR from 'swr';

import Header from '../components/Header';
import ItemForSale from '../components/ItemForSale';
import { useAuth } from '../lib/auth';
import { authService } from '../lib/firebase';
import fetcher from '../utils/fetcher';

interface accountProps {}

const account: React.FC<accountProps> = ({}) => {
  const user = useAuth();
  const { data, error } = useSWR(
    user ? ['/api/products', user.token] : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box bg="#EAEDED" minH="100vh">
      <Header />
      <main style={{ margin: '0 35px', minHeight: '100%' }}>
        <Text fontSize="4xl" m="10px 0">
          Items for sale
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {data?.map((product: any) => (
            <ItemForSale values={product} key={product.id} />
          ))}
        </Grid>
      </main>
    </Box>
  );
};

export default account;
