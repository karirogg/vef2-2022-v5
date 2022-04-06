import Link from 'next/link';
import React, { useContext } from 'react';
import { Context } from '../../pages/_theme';
import Button from '../Button/Button';
import s from './Footer.module.scss';

type IProps = {
  logout: () => void;
};

export default function Footer({ logout }: IProps) {
  const { user } = useContext(Context);

  return (
    <div className={s.user}>
      {user ? (
        <React.Fragment>
          <p className={s.user__loggedIn}>Skráð/ur inn sem: {user.name}</p>
          <Button onClick={logout}>Útskráning</Button>
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
