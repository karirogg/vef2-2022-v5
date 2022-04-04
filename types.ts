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
  name: string;
  comment: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
};
