import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
