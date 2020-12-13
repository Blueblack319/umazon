import { GetStaticProps, GetStaticPropsResult } from 'next';
import { Box, Text, Grid, Image } from '@chakra-ui/react';

import Header from '../components/Header';
import { useAuth } from '../utils/auth';
import { getUserProducts } from '../utils/db';
import { authService } from '../utils/firebase';

interface accountProps {}

const account: React.FC<accountProps> = ({}) => {
  const auth = useAuth();
  return (
    <Box bg="#EAEDED" minH="100vh">
      <Header />
      <main style={{ margin: '0 35px', minHeight: '100%' }}>
        <Text fontSize="4xl" m="10px 0">
          Items for sale
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          <Box p="10px 20px" minW="350px" h="400px" bg="white">
            <Text fontSize="2xl">Product Name</Text>
            <Image
              boxSize="200px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="example"
            />
            <Text>Stock</Text>
            <Text>Cost</Text>
            <Text>Description</Text>
            <Text>Rating</Text>
            <Text>Sale date</Text>
          </Box>
          <Box minW="350px" h="400px" bg="white">
            Hello
          </Box>
          <Box minW="350px" h="400px" bg="white">
            Hello
          </Box>
        </Grid>
      </main>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const id = authService.currentUser;
  console.log(id === null);
  // const { products } = await getUserProducts(id);
  // console.log(products);

  return {
    props: {
      id,
    },
  };
};

export default account;
