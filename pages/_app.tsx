import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import { AuthProvider } from '../lib/auth';
import { CheckoutProvider } from '../utils/checkout';
// import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CheckoutProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CheckoutProvider>
    </AuthProvider>
  );
}

export default MyApp;
