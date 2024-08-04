import { Controller, Get } from '@nestjs/common';
import { DiamondService } from './diamond.service';

@Controller('diamond')
export class DiamondController {
  constructor(private readonly diamondService: DiamondService) {}

  @Get()
  async findAll() {
    return await this.diamondService.findAll();
  }
}
