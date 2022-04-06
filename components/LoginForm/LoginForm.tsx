import { useState } from 'react';
import { LoginData, RegisterData } from '../../utils/types';
import Button from '../Button/Button';
import s from './LoginForm.module.scss';

type IProps =
  | (
      | {
          login: true;
          onPost: (data: LoginData) => void;
        }
      | {
          login: false;
          onPost: (data: RegisterData) => void;
        }
    ) & { errors: string[] };

export default function LoginForm({ errors, login, onPost }: IProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <div>
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        {!login && (
          <div className={s.field}>
            <label>Nafn:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
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
        <div className={s.errors}>
          {errors.map((e: string, i) => (
            <p className={s.errors__title} key={i}>
              {e}
            </p>
          ))}
        </div>
        <Button onClick={() => onPost({ username, password, name })}>
          {login ? 'Skrá inn' : 'Nýskrá'}
        </Button>
      </form>
    </div>
  );
}
