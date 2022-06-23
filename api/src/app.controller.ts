import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('result/list')
  getResultList() {
    return this.prismaService.client.result.findMany();
  }

  @Get('result/:id')
  getResultDetail(@Param() params) {
    return this.prismaService.client.result.findUnique({
      where: { id: Number(params.id) },
    });
  }
}
