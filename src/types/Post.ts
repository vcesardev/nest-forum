import { User } from './User';

export type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  user: User;
};
