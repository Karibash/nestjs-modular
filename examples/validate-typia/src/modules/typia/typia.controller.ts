import { createIncomingDto } from '@nestjs-modular/validate';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { createAssert } from 'typia';

class ParamDto extends createIncomingDto(createAssert<{
  id: string;
}>()) {}

class BodyDto extends createIncomingDto(createAssert<{
  title: string;
  content: string;
}>()) {}

@Controller('typia')
export class TypiaController {
  @Post(':id')
  public endpoint(
    @Param() param: ParamDto,
    @Body() body: BodyDto,
  ): void {
    console.log({ param, body });
  }
}
