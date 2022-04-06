import { createContext } from 'react';
import { User } from './types';

export type IContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const defaultUser: User | null = null;

export const Context = createContext<IContext>({
  user: defaultUser,
  setUser: (user: User | null) => {},
});
