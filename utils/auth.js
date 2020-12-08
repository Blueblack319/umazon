import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';

import { firebaseInstance, authService } from './firebase';
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user; // 왜 여기서 token을 사용할 수 없지??

      createUser(user.uid, userWithoutToken);
      setUser(user);

      setIsLoading(false);
      return user;
    } else {
      setUser(false);
      setIsLoading(false);
      return false;
    }
  };

  // const signupWithEmail = (email, password) => {
  //   setIsLoading(true);
  //   return authService.createUserWithEmailAndPassword(email, password).then
  // }

  const signinWithEmail = (email, password) => {
    setIsLoading(true);
    return authService
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        handleUser(res.user);
        Router.push('/');
      });
  };

  const signinWithGithub = (redirect) => {
    setIsLoading(true);
    return authService
      .signInWithPopup(new firebaseInstance.auth.GithubAuthProvider())
      .then((res) => {
        handleUser(res.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signout = () => {
    Router.push('/');
    return authService.signout().then(() => setUser(null));
  };

  useEffect(() => {
    const unsubscribe = authService.onIdTokenChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      return () => unsubscribe();
    });
  });

  return {
    user,
    signinWithGithub,
    signout,
  };
}

const getStripeRole = async () => {
  await authService.currentUser.getIdToken(true);
  const decodedeToken = await authService.currentUser.getIdTokenResult();

  return decodedeToken.claims?.stripeRole || 'free';
};

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.ya,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    stripeRole: await getStripeRole(),
  };
};
