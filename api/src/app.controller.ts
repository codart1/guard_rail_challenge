import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

/**
 * For the sake of simplicity. I use REST api instead of
 * setting up a graphql server
 */
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

  /**
   * We should validate input here using a schema validator like `zod` or `class-validator`.
   * But let's keep it simple for this exercise.
   */
  @Post('result')
  createResult(@Body() params: Prisma.ResultCreateArgs['data']) {
    return this.prismaService.client.result.create({
      data: params,
    });
  }
}
