import { Controller, Get } from '@nestjs/common';
import { DiamondService } from './diamond.service';

@Controller('diamond')
export class DiamondController {
  constructor(private readonly diamondService: DiamondService) {}

  @Get()
  findAll() {
    return this.diamondService.findAll();
  }
}
