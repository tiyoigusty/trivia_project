import { PartialType } from '@nestjs/mapped-types';
import { CreateAvatarDto, CreateUserDto } from './create-avatar.dto';

export class UpdateAvatarDto extends PartialType(CreateAvatarDto) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
