import { Record as PrismaRecord } from '@prisma/client';
import { Server as PrismaServer } from '@prisma/client';

export type IServer = PrismaServer;
export type IServerData = Omit<IServer, 'id' | 'createdAt' | 'updatedAt'>;

export type IRecord = PrismaRecord;
export type IRecordData = Omit<
  IRecord,
  'id' | 'serverId' | 'createdAt' | 'updatedAt'
> & { url: string };

export class Server implements Omit<IServer, 'createdAt' | 'updatedAt'> {
  name: string;
  id: number;
  ip: string;
  url: string;
  server: string;
}

export class ServerDataInput implements IServerData {
  name: string;
  server: string;
  ip: string;
  url: string;
}

export class Record
  implements Omit<IRecord, 'serverId' | 'createdAt' | 'updatedAt'>
{
  id: number;
  status: string;
}

export class RecordDataInput implements IRecordData {
  status: string;
  url: string;
}
