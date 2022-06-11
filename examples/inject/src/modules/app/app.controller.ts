import { Controller, Get } from '@nestjs/common';

import { BarService } from '../../services/bar.service';
import { BazService } from '../../services/baz.service';
import { FooService } from '../../services/foo.service';

@Controller()
export class AppController {
  constructor(
    private readonly barService: BarService,
    private readonly bazService: BazService,
    private readonly fooService: FooService,
  ) {}

  @Get('/bar')
  getBar(): string {
    return this.barService.invoke();
  }

  @Get('/baz')
  getBaz(): string {
    return this.bazService.invoke();
  }

  @Get('/foo')
  getFoo(): string {
    return this.fooService.invoke();
  }
}
