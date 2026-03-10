import { z } from "zod";

export const InputSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom de la tâche ne peut pas être vide") 
    .max(100, "Le nom est trop long") 
    .trim(), 
});

export type IInput = z.infer<typeof InputSchema>;