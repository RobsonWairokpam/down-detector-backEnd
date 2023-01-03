import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
export class PrismaService extends PrismaClient {
  // private readonly logger: Logger;
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:postgres123@localhost:7000/sellinium?schema=public',
        },
      },
    });
  }
}
