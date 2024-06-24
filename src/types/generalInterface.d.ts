import { Request } from 'express';

export interface tempI {
  name: string;
}

export interface IRequest extends Request {
  user: {
    id: number;
    role_id: number;
  };
}
