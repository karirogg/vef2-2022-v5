import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '../components/Footer/Footer';
import LoginForm from '../components/LoginForm/LoginForm';
import { LoginError, RegisterData, User } from '../types';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  async function postRegister({ name, username, password }: RegisterData) {
    const request = await fetch(
      'https://vef2-v3-kari.herokuapp.com/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password }),
      }
    );

    if (request.ok) {
      const data = await request.json();
      console.log(`User ${data.username} successfully created`);
      setUser(data);
    } else {
      const message = await request.json();

      setErrors(message.errors.map((error: LoginError) => error.msg));
    }
  }

  return (
    <div className="main">
      <h1>Nýskráning</h1>
      {!user ? (
        <LoginForm login={false} errors={errors} onPost={postRegister} />
      ) : (
        <p>Notandi {user.name} var búinn til. Skráðu þig inn að neðan.</p>
      )}
      <Footer />
    </div>
  );
};

export default LoginPage;
