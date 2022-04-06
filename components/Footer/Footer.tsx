import Link from 'next/link';
import React, { useContext } from 'react';
import { Context } from '../../pages/_theme';
import s from './Footer.module.scss';

export default function Footer() {
  const { user, setUser } = useContext(Context);

  function logout() {
    setUser(null);
    localStorage.setItem('token', '');
  }

  return (
    <div className={s.user}>
      {user ? (
        <React.Fragment>
          <p className={s.user__loggedIn}>Skráð/ur inn sem: {user.name}</p>
          <a onClick={logout}>Útskráning</a>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link href="/login">Skrá inn</Link>
          <Link href="/register">Nýskráning</Link>
        </React.Fragment>
      )}
    </div>
  );
}
