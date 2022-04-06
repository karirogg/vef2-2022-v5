import type { NextPage } from 'next';
import { useContext } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { LoginData, User } from '../types';
import { Context, IContext } from './_theme';

type LoginResponseData = {
  user: User;
  token: string;
  admin: boolean;
};

const LoginPage: NextPage = () => {
  const { setUser }: IContext = useContext(Context);

  async function postLogin({ username, password }: LoginData) {
    const request = await fetch(
      'https://vef2-v3-kari.herokuapp.com/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await request.json();

    try {
      localStorage.setItem('token', data.token);
      console.log(data.user);
      await setUser(data.user);
    } catch (e) {
      console.log(data);
    }
  }

  return (
    <div className="main">
      <LoginForm onPost={postLogin} />
    </div>
  );
};

export default LoginPage;
