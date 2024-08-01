import { z } from 'zod';

export const CreateAvatarSchema = z.object({
  id: z.string().uuid(),
  image: z.string().url(),
});
