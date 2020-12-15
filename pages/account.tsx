import { Box, Text, Grid, Skeleton } from '@chakra-ui/react';
import useSWR from 'swr';

import Header from '../components/Header';
import ItemForSale from '../components/ItemForSale';
import LayoutWithHeader from '../hoc/LayoutWithHeader';
import { useAuth } from '../lib/auth';
import fetcher from '../utils/fetcher';

const account = () => {
  const { user } = useAuth();

  const { data, error } = useSWR(
    user ? ['/api/products', user.token] : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return (
    <LayoutWithHeader>
      <Text fontSize="4xl" m="10px 0">
        Items for sale
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        {!data ? (
          <>
            <Skeleton height="400px" />
            <Skeleton height="400px" />
            <Skeleton height="400px" />
          </>
        ) : (
          data.map((product: any) => (
            <ItemForSale values={product} key={product.id} />
          ))
        )}
      </Grid>
    </LayoutWithHeader>
  );
};

export default account;
