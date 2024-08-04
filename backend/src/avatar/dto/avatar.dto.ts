import { CreateAvatarSchema } from '../schema/avatar.schema';
import { z } from 'zod';

export type CreateAvatarDto = z.infer<typeof CreateAvatarSchema>;
