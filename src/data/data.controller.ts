import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DataInput } from './data.model';
import { DataService } from './data.service';

@Controller('/data')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Post('/create')
  createUsero(
    @Body()
    data: DataInput,
  ) {
    return this.service.createUser(data);
  }

  @Post('/getAll')
  getting(
    @Body()
    records: [],
  ) {
    return this.service.getting(records);
  }

  @Get('/')
  getUser() {
    return this.service.getUser();
  }
  @Get('/some/:size/:page')
  async getSOme(
    @Param('size', ParseIntPipe) size: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    const { data, count } = await this.service.getsom(size, page);
    return { data, count };
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.unique(id);
  }
}
