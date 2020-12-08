import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';

import Header from '../components/Header';
import { useAuth } from '../utils/auth';

const bgImages = [
  '/bg1.jpg',
  '/bg2.jpg',
  '/bg3.jpg',
  '/bg4.jpg',
  '/bg5.jpg',
  '/bg6.jpg',
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const handleLeftIconClicked = () => {
    if (index === 0) {
      setIndex(5);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };
  const handleRightIconClicked = () => {
    if (index === 5) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const auth = useAuth();
  return (
    <div style={{ backgroundColor: '#EAEDED', minHeight: '100vh' }}>
      <Header />
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 50%, #EAEDED, #EAEDED), url(${bgImages[index]})`,
          backgroundRepeat: 'no-repeat ',
          minHeight: 'calc(100vh - 60px)',
          margin: '0 20px',
        }}
      >
        <Flex
          h="250px"
          w="100%"
          align="center"
          justify="space-between"
          p="0 40px"
        >
          <ArrowLeftIcon
            fontSize="40px"
            cursor="pointer"
            onClick={handleLeftIconClicked}
          />

          <ArrowRightIcon
            fontSize="40px"
            cursor="pointer"
            onClick={handleRightIconClicked}
          />
        </Flex>
      </div>
    </div>
  );
}
