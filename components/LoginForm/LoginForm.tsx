import { useState } from 'react';
import { LoginData, RegisterData } from '../../types';
import Button from '../Button/Button';
import s from './LoginForm.module.scss';

type IProps = {
  onPost: (data: LoginData | RegisterData) => void;
};

export default function LoginForm({ onPost }: IProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div>
      <h1>Innskráning</h1>
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <div className={s.field}>
          <label>Notandanafn:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={s.field}>
          <label>Lykilorð:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={() => onPost({ username, password })}>Skrá inn</Button>
      </form>
    </div>
  );
}
