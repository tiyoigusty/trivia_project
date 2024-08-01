import { PartialType } from '@nestjs/mapped-types';
import { CreateDiamondDto } from './create-diamond.dto';

export class UpdateDiamondDto extends PartialType(CreateDiamondDto) {}
