import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}
  private logger = new Logger();

  @Post('sum')
  sum1(@Body('numbers') numbers: number[]): number {
    this.logger.log('sum : ' + numbers);
    return this.mathService.accumulate(numbers);
  }

  @MessagePattern({ cmd: 'sum' })
  sum2(numbers: number[]): number {
    this.logger.log('sum2 ' + numbers);
    return this.mathService.accumulate(numbers);
  }
}
