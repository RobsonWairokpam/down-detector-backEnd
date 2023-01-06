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
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
