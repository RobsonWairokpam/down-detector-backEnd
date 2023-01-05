import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RecordDataInput, ServerDataInput } from './data.model';
import { DataService } from './data.service';

@Controller('/data')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Post('/create/')
  createRecords(
    @Body()
    data: RecordDataInput[],
  ) {
    return this.service.createRecords(data);
  }

  @Post('/createServers')
  createList(
    @Body()
    records: ServerDataInput[],
  ) {
    return this.service.createList(records);
  }
  @Post('/createServer')
  createserver(
    @Body()
    data: ServerDataInput,
  ) {
    return this.service.createServer(data);
  }

  @Get('/list')
  getUrlList() {
    return this.service.findLists();
  }

  @Get('/records/:serverId')
  getRecordsbyUrlId(@Param('serverId', ParseIntPipe) serverId: number) {
    return this.service.findRecordsByUrlId(serverId);
  }

  @Get('/oneRecord/:serverId')
  getOneRecoord(@Param('serverId', ParseIntPipe) serverId: number) {
    return this.service.findOneRecord(serverId);
  }
}
