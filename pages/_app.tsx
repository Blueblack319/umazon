import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import { AuthProvider } from '../lib/auth';
// import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
