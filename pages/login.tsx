import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Footer from '../components/Footer/Footer';
import LoginForm from '../components/LoginForm/LoginForm';
import { BASE_URL } from '../utils/consts';
import { Context, IContext } from '../utils/context';
import { LoginData, LoginError, User } from '../utils/types';

type LoginResponseData = {
  user: User;
  token: string;
  admin: boolean;
};

const LoginPage: NextPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const { setUser }: IContext = useContext(Context);
  const router = useRouter();

  async function postLogin({ username, password }: LoginData) {
    const request = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (request.ok) {
      const data = await request.json();

      localStorage.setItem('token', data.token);
      setUser(data.user);

      router.push('/');
    } else {
      const message = await request.json();

      setErrors(message.errors.map((error: LoginError) => error.msg));
    }
  }

  return (
    <div className="main">
      <h1>Innskráning</h1>
      <LoginForm login={true} errors={errors} onPost={postLogin} />
      <Footer />
    </div>
  );
};

export default LoginPage;
