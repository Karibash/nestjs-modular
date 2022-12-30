import { createIncomingDto } from '@nestjs-modular/validate';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { resolver } from '@valivali/runtypes';
import * as rt from 'runtypes';

class ParamDto extends createIncomingDto(resolver(rt.Record({
  id: rt.String,
}))) {}

class BodyDto extends createIncomingDto(resolver(rt.Record({
  title: rt.String,
  content: rt.String,
}))) {}

@Controller('runtypes')
export class RuntypesController {
  @Post(':id')
  public endpoint(
    @Param() param: ParamDto,
    @Body() body: BodyDto,
  ): void {
    console.log({ param, body });
  }
}
