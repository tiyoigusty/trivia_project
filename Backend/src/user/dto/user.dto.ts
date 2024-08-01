import { UpdateUserAvatarSchema } from '../schema/user.schema';
import { z } from 'zod';

export type UpdateUserAvatarDto = z.infer<typeof UpdateUserAvatarSchema>;
