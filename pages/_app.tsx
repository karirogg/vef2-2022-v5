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

        if (res.ok) {
          const result = await res.json();

          const { id, username, name, admin } = result;
          setUser({ id, username, name, admin });
        } else {
          setUser(null);
          await localStorage.setItem('token', '');
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
