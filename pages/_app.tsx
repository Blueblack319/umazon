import { ChakraProvider, Box } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import { AuthProvider } from '../lib/auth';
import { CartProvider } from '../utils/cart';
import Header from '../components/Header';
// import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
