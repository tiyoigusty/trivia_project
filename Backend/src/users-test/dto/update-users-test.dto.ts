import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersTestDto } from './create-users-test.dto';

export class UpdateUsersTestDto extends PartialType(CreateUsersTestDto) {}
