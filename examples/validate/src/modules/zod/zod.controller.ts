import { createIncomingDto } from '@nestjs-modular/validate';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { resolver } from '@valivali/zod';
import { z } from 'zod';

class ParamDto extends createIncomingDto(resolver(z.object({
  id: z.string(),
}))) {}

class BodyDto extends createIncomingDto(resolver(z.object({
  title: z.string(),
  content: z.string(),
}))) {}

@Controller('zod')
export class ZodController {
  @Post(':id')
  public endpoint(
    @Param() param: ParamDto,
    @Body() body: BodyDto,
  ): void {
    console.log({ param, body });
  }
}
