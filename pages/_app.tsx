import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/globals.scss';
import { BASE_URL } from '../utils/consts';
import { Context } from '../utils/context';
import { User } from '../utils/types';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = await localStorage.getItem('token');
      if (token !== '') {
        const res = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        try {
          const { id, username, name, admin } = result;
          setUser({ id, username, name, admin });
        } catch {
          await localStorage.setItem('token', '');
          setUser(null);
        }
      }
    }

    fetchUser();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
