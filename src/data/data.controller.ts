import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
// import axios from 'axios';
import fetch from 'node-fetch';
import { PrismaService } from '../prisma/prisma.service';
import { RecordDataInput, ServerDataInput } from './data.model';
import { DataService } from './data.service';

@Controller('/data')
export class DataController {
  constructor(
    private readonly service: DataService,
    private readonly prisma: PrismaService,
  ) {}

  // @Get('/d')
  @Cron('* */5 * * * *')
  async datas() {
    const data = await this.prisma.server.findMany();

    const abc = Promise.resolve(data.map((e) => e.url));
    Promise.all([abc]).then((value) => {
      console.log('RRRR', value[0]);

      for (const address of value[0]) {
        const url = new URL(address);
        const newAddr = `https://${url.host}/`;
        console.log('ABAVA>>>', url.host);

        fetch(newAddr, {
          method: 'GET',
        })
          .then((res) => {
            if (res.status / 100 === 2) {
              return this.prisma.record.create({
                data: {
                  status: 'Up',
                  server: {
                    connect: {
                      url: newAddr,
                    },
                  },
                },
              });
            }
          })
          .catch((e: any) => {
            if (e) {
              return this.prisma.record.create({
                data: {
                  status: 'Down',
                  server: {
                    connect: {
                      url: newAddr,
                    },
                  },
                },
              });
            }
          });
        // axios
        //   .get(newAddr)
        //   .then((res) => {
        //     // console.log({ [address]: res.status });
        //     if (res.status / 100 === 2) {
        //       return this.prisma.record.create({
        //         data: {
        //           status: 'Up',
        //           server: {
        //             connect: {
        //               url: newAddr,
        //             },
        //           },
        //         },
        //       });
        //       // console.log('SUUCES', newAddr);
        //     }
        //   })
        // .catch((err) => {
        //   if (err) {
        //     return this.prisma.record.create({
        //       data: {
        //         status: 'Down',
        //         server: {
        //           connect: {
        //             url: newAddr,
        //           },
        //         },
        //       },
        //     });
        //   }
        //     console.error({ [address]: err.code });
        //   });
      }
    });
  }

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

  @Get('/url/:id')
  getUrl(@Param('id', ParseIntPipe) id: number) {
    return this.service.findUrl(id);
  }

  @Get('/records/:serverId')
  getRecordsbyUrlId(@Param('serverId', ParseIntPipe) serverId: number) {
    return this.service.findRecordsByUrlId(serverId);
  }

  @Put('/url/update/:id')
  updateServer(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: ServerDataInput,
  ) {
    return this.service.updateServer(data, id);
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
