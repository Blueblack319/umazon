import Head from 'next/head';
import { Button } from 'antd';

import { useAuth } from '../utils/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <h1>Main Page</h1>
      <p>fjdksalfjsdjkla;fjsladjfsdljldsaf;jfksdlafjsdklafjkl</p>
    </div>
  );
}
