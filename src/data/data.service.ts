import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUserData } from './data.model';

@Injectable()
export class DataService {
  private readonly repo: PrismaService['records'];
  private readonly repoAll: PrismaService['recordAll'];
  constructor(prismaService: PrismaService) {
    this.repo = prismaService.records;
    this.repoAll = prismaService.recordAll;
  }
  async createUser(data: IUserData) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data);
    return this.repo.create({
      data: {
        status: data.status,
        url: data.url,
        date: data.date,
      },
    });
  }

  async getting(records: []) {
    for (let i = 0; i < records.length; i++) {
      console.log('Block statement execution no.>>>', records[i]);
      await this.repoAll.create({
        data: {
          records: records[i],
        },
      });
      // return res;
    }
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data[i]);
  }

  async getUser() {
    return this.repo.findMany();
  }

  async getsom(size: number, page: number) {
    const skip = Math.max(page - 1, 0) * size;
    const res = await this.repoAll.findMany({
      take: size,
      skip: skip,
      orderBy: { createdAt: 'desc' },
    });
    const count = await this.repoAll.count();
    console.log(
      'Resulr',
      res.map((e) => e.records),
    );
    return { data: res, count };
  }

  async unique(iid: number) {
    return this.repo.findUnique({
      where: {
        iid: iid,
      },
    });
  }
}
