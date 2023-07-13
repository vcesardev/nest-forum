import { Post } from './Post';

export enum Role {
  User = 1,
  Admin = 2,
}

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  birthdate: Date;
  role: Role;
};
