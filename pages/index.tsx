import { useRef, useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Flex, Box, HStack, Grid, Image, Text } from '@chakra-ui/react';

import Header from '../components/Header';
import ItemBox from '../components/ItemBox';

const bgImages = [
  ['/bg6.jpg', '1'],
  ['/bg1.jpg', '2'],
  ['/bg2.jpg', '3'],
  ['/bg3.jpg', '4'],
  ['/bg4.jpg', '5'],
  ['/bg5.jpg', '6'],
  ['/bg6.jpg', '7'],
  ['/bg1.jpg', '8'],
];

const slideLength = bgImages.length - 2;

export default function Home() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [slideStyle, setSlideStyle] = useState<React.CSSProperties | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number>(1);
  const [winWidth, setWinWidth] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      setWinWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    setSlideStyle({
      transform: `translateX(-${boxRef.current?.clientWidth! * index}px)`,
    });
  }, [winWidth]);
  const handleLeftIconClicked = () => {
    if (index >= 1) {
      setSlideStyle({
        transition: '700ms',
        transform: `translateX(-${
          boxRef.current?.clientWidth! * (index - 1)
        }px)`,
      });
      setIndex(index - 1);
    }
    if (index === 1) {
      setTimeout(() => {
        setSlideStyle({
          transition: '0ms',
          transform: `translateX(-${
            boxRef.current?.clientWidth! * slideLength
          }px)`,
        });
      }, 700);
      setIndex(slideLength);
    }
  };
  const handleRightIconClicked = () => {
    if (index <= slideLength) {
      setSlideStyle({
        transition: '700ms',
        transform: `translateX(-${
          boxRef.current?.clientWidth! * (index + 1)
        }px)`,
      });
      setIndex(index + 1);
    }
    if (index === slideLength) {
      setTimeout(() => {
        setSlideStyle({
          transition: '0ms',
          transform: `translateX(-${boxRef.current?.clientWidth}px)`,
        });
      }, 700);
      setIndex(1);
    }
  };
  return (
    <Box bg="#EAEDED" minH="100vh">
      <Header />
      <main style={{ margin: '0 35px', minHeight: '100%' }}>
        <Box w="100%" h="100%" ref={boxRef} overflowX="hidden" bgColor="#EAEDE">
          <HStack
            spacing="0"
            w={boxRef.current?.clientWidth! * bgImages.length}
            style={slideStyle}
          >
            {bgImages.map((img) => (
              <Box
                bgImage={`linear-gradient(rgba(255, 255, 255, 0) 50%, #EAEDED, #EAEDED), url(${img[0]})`}
                bgRepeat="no-repeat"
                w={boxRef.current?.clientWidth}
                minH="calc(100vh - 60px)"
                key={`${img[1]} + ${new Date().toISOString()}`}
              ></Box>
            ))}
          </HStack>
        </Box>
        <Flex
          h="250px"
          w="100%"
          align="center"
          justify="space-between"
          p="0 60px"
          pos="absolute"
          left="0"
          top="200px"
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
        <Box w="100%" h="1000vh" transform="translateY(-300px)">
          <Grid
            templateColumns={[
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
            ]}
            gap={6}
            m="0 50px"
          >
            <ItemBox>
              <Flex flexDir="column" align="center" justify="center">
                <Text fontSize="xl" textAlign="center">
                  A Knock at Midnight: A Story of Hope, Justice, and Freedom
                </Text>

                <Image
                  src="https://m.media-amazon.com/images/I/41zyNS33aFL.jpg"
                  alt="img1"
                  w="200px"
                  h="250px"
                />
              </Flex>
            </ItemBox>
            <ItemBox>Hi</ItemBox>
            <ItemBox>Hi</ItemBox>
            <ItemBox>Hi</ItemBox>
            <ItemBox>Hi</ItemBox>
            <ItemBox>Hi</ItemBox>
            <ItemBox>Hi</ItemBox>
            <ItemBox>Hi</ItemBox>
            <ItemBox>Hi</ItemBox>
          </Grid>
        </Box>
      </main>
    </Box>
  );
}
