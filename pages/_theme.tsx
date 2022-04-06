import { createContext, useState } from 'react';
import { User } from '../utils/types';

export type IContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const defaultUser: User | null = null;

export const Context = createContext<IContext>({
  user: defaultUser,
  setUser: (user: User | null) => {},
});

type IProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: IProps) {
  const [user, setUser] = useState<User | null>(defaultUser);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}
