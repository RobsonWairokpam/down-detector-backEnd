import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  //   imports: [PrismaModule],
  controllers: [DataController],
  providers: [DataService, DataController],
  exports: [DataService],
})
export class DataModule {}
