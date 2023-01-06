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

  @Post('/status/create')
  createRecords(
    @Body()
    data: RecordDataInput[],
  ) {
    return this.service.createRecords(data);
  }

  @Post('/url/create')
  createserver(
    @Body()
    data: ServerDataInput,
  ) {
    return this.service.createServer(data);
  }

  @Get('/urlList/get')
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

  @Post('/urlLists/create')
  createServersList(
    @Body()
    records: ServerDataInput[],
  ) {
    return this.service.createList(records);
  }
}
