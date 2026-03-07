import { z } from "zod";

export const SignSchema = z
  .object({
    email: z
      .string()
      .email("Veuillez entrer une adresse email valide"),

    password: z
      .string()
      .min(9, "Le mot de passe doit contenir au moins 9 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule"),

    confirmPassword: z.string(),

    name: z
      .string()
      .min(1, "Votre nom est obligatoire"),

    firstName: z
      .string()
      .min(1, "Votre prénom est obligatoire"),

    famillyName: z
      .string()
      .min(1, "Votre famille est obligatoire"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les deux mots de passe doivent être identiques",
    path: ["confirmPassword"],
  });

export type ISign = z.infer<typeof SignSchema>;