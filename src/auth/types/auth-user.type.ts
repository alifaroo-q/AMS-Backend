import { User } from '../../users/entities/users.entity';

export interface IAuthUser extends User {
  sub: string;
  eml: string;
  sys: string;
  iat: number;
  exp: number;
  sts: string;
  role: number;
  human: string;
}
