import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAuth } from '../utils/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Let's clone Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Let's clone Fast Feedback</h1>

        <button onClick={() => auth.signinWithGithub()}>
          Continue with Github
        </button>
        <div>{auth.user?.email}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
