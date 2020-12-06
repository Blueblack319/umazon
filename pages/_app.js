import '../styles/globals.css';
import { AuthProvider } from '../utils/auth';
import CustomLayout from '../hoc/CustomLayout';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    </AuthProvider>
  );
}

export default MyApp;
