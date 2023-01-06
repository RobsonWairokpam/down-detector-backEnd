import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IServerData, RecordDataInput } from './data.model';

@Injectable()
export class DataService {
  constructor(private readonly prisma: PrismaService) {}

  async createRecords(data: RecordDataInput[]) {
    const list = await this.prisma.server.findMany({
      select: { id: true, url: true },
      where: {
        url: { in: data.map((e) => e.url) },
      },
    });

    const serverIdMap = new Map(
      list.map((l) => {
        return [l.url, l.id];
      }),
    );
    console.log('Mapserver', serverIdMap);

    const res = await this.prisma.record.createMany({
      data: data.map((d) => ({
        status: d.status,
        serverId: serverIdMap.get(d.url), // If URL is not present in the database
      })),
    });

    return res;
  }
  async createServer(data: IServerData) {
    const res = await this.prisma.server.create({
      data,
    });

    return res;
  }

  async updateServer(data: IServerData, id: number) {
    const res = await this.prisma.server.update({
      where: {
        id: id,
      },
      data,
    });

    return res;
  }

  async createList(data: IServerData[]) {
    const res = await this.prisma.server.createMany({
      data: data.map((d) => ({
        ip: d.ip,
        url: d.url,
        server: d.server,
      })),
    });

    return res;
  }

  async findLists() {
    const lists = await this.prisma.server.findMany({
      include: {
        record: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    });
    if (lists.length === 0) {
      throw new BadRequestException('No Data');
    }
    return lists;
  }

  async findUrl(id: number) {
    const lists = await this.prisma.server.findUnique({
      where: {
        id: id,
      },
    });
    return lists;
  }

  async findOneRecord(urlId: number) {
    const res = await this.prisma.record.findFirst({
      where: {
        serverId: urlId,
      },
      orderBy: { createdAt: 'desc' },
    });
    return res;
  }

  async findRecordsByUrlId(urlId: number) {
    console.log(urlId);
    const res = await this.prisma.record.findMany({
      where: {
        server: { id: urlId },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res;
  }
}
