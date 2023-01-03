import { Records as PrismaRecord } from '@prisma/client';

export type IUser = PrismaRecord;
export type IUserData = Omit<IUser, 'iid' | 'createdAt' | 'updatedAt'>;

export class Data implements Omit<IUser, 'createdAt' | 'updatedAt'> {
  status: string;
  url: string;
  date: string;
  iid: number;
}
export class DataInput implements IUserData {
  status: string;
  url: string;
  date: string;
}
