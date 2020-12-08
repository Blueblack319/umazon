import Header from '../components/Header';
import { useAuth } from '../utils/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <Header />
      <h1>Main Page</h1>
      <p>fjdksalfjsdjkla;fjsladjfsdljldsaf;jfksdlafjsdklafjkl</p>
    </>
  );
}
