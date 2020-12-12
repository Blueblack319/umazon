import { Box, Text, Image } from '@chakra-ui/react';

const ItemForSale = ({ values }: any) => {
  const {
    productName,
    img,
    cost,
    description,
    rating,
    createdAt,
    id,
    ownerId,
  } = values;

  return (
    <Box p="10px 20px" minW="350px" h="400px" bg="white">
      <Text fontSize="2xl">{productName}</Text>
      <Image boxSize="200px" objectFit="cover" src={img} alt="example" />
      <Text>Stock</Text>
      <Text>Cost {cost}</Text>
      <Text>Description: {description}</Text>
      <Text>Rating: {rating}</Text>
      <Text>Sale date {createdAt}</Text>
      <Text>
        {id} {ownerId}
      </Text>
    </Box>
  );
};

export default ItemForSale;
