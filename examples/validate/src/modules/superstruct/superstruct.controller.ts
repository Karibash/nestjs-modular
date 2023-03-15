import { createIncomingDto } from '@nestjs-modular/validate';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { resolver } from '@valivali/superstruct';
import st from 'superstruct';

class ParamDto extends createIncomingDto(resolver(st.object({
  id: st.string(),
}))) {}

class BodyDto extends createIncomingDto(resolver(st.object({
  title: st.string(),
  content: st.string(),
}))) {}

@Controller('superstruct')
export class SuperstructController {
  @Post(':id')
  public endpoint(
    @Param() param: ParamDto,
    @Body() body: BodyDto,
  ): void {
    console.log({ param, body });
  }
}
