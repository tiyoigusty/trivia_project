import { z } from 'zod';

export const UpdateUserAvatarSchema = z.object({
  avatarId: z.string().uuid().optional(),
  avatarImage: z.string().url(),
  name: z.string().optional(),
});
