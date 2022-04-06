export type Event = {
  id: number;
  name: string;
  creator_id: number;
  slug: string;
  creator: string;
  description: string;
  created: string;
  updated: string;
};

export type Registration = {
  id: number;
  name: string;
  comment: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  admin: boolean;
};

export type LoginData = {
  username: string;
  password: string;
};

export type RegisterData = {
  username: string;
  name: string;
  password: string;
};

export type LoginError = {
  value: string;
  msg: string;
  param: string;
  location: string;
};
