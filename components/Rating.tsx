import { StarIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(<StarIcon color="gold" key={i} />);
  }

  return <>{stars}</>;
};

export default Rating;
