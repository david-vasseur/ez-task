import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .email("Veuillez entrer une adresse email valide"),

    password: z
        .string()
        .min(9, "Le mot de passe doit contenir au moins 9 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule"),
});

export type ILogin = z.infer<typeof LoginSchema>;