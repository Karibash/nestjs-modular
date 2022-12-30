import { createIncomingDto } from '@nestjs-modular/validate';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { resolver } from '@valivali/yup';
import * as yup from 'yup';

class ParamDto extends createIncomingDto(resolver(yup.object({
  id: yup.string().required(),
}))) {}

class BodyDto extends createIncomingDto(resolver(yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
}))) {}

@Controller('yup')
export class YupController {
  @Post(':id')
  public endpoint(
    @Param() param: ParamDto,
    @Body() body: BodyDto,
  ): void {
    console.log({ param, body });
  }
}
