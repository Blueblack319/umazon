import { useState, useRef, useEffect, createRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Image } from '@chakra-ui/react';

import Header from '../components/Header';
import { useAuth } from '../utils/auth';

const bgImages = [
  ['/bg6.jpg', '0'], // 0
  ['/bg1.jpg', '1'], // 400, 1
  ['/bg2.jpg', '2'], // 800, 2
  ['/bg3.jpg', '3'], // 1200, 3
  ['/bg4.jpg', '4'], // 1600, 4
  ['/bg5.jpg', '5'], // 2000, 5
  ['/bg6.jpg', '6'], // 2400, 6
  ['/bg1.jpg', '7'], // 2800
];

export default function Home() {
  const [index, setIndex] = useState<number>(1);
  const [slideStyle, setSlideStyle] = useState<React.CSSProperties | undefined>(
    undefined
  );
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSlideStyle({
      transform: `translateX(-${boxRef?.current?.clientWidth!}px)`,
    });
  }, []);

  const handleLeftIconClicked = () => {
    console.log(index);
    if (index >= 1) {
      setSlideStyle({
        transition: '700ms',
        transform: `translateX(-${
          boxRef?.current?.clientWidth! * (index - 1)
        }px)`,
      });
      setIndex(index - 1);
    }
    if (index === 1) {
      setTimeout(function () {
        setSlideStyle({
          transition: '0ms',
          transform: `translateX(-${
            boxRef?.current?.clientWidth! * (bgImages.length - 2)
          }px)`,
        });
      }, 700);
      setIndex(bgImages.length - 2);
    }
  };
  const handleRightIconClicked = () => {
    if (index <= bgImages.length - 2) {
      setSlideStyle({
        transition: '700ms',
        transform: `translateX(-${
          boxRef?.current?.clientWidth! * (index + 1)
        }px)`,
      });
      setIndex(index + 1);
    }
    if (index === bgImages.length - 2) {
      setTimeout(function () {
        setSlideStyle({
          transition: '0ms',
          transform: `translateX(-${boxRef?.current?.clientWidth!}px)`,
        });
      }, 700);
      setIndex(1);
    }
  };

  const auth = useAuth();
  return (
    <div
      style={{
        backgroundColor: '#EAEDED',
        minHeight: '100vh',
      }}
    >
      <Header />
      <main style={{ margin: '0 40px' }}>
        <Box w="100%" overflowX="hidden" ref={boxRef}>
          <HStack style={slideStyle} spacing="0">
            {bgImages.map((img) => {
              return (
                <Image
                  src={img[0]}
                  alt="bgImage"
                  key={img[1] + new Date().toISOString()}
                />
              );
            })}
          </HStack>
        </Box>
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
      </main>
    </div>
  );
}
