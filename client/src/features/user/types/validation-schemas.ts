import { z } from "zod";

export const avatarSchema = z.object({
    avatar: z
      .instanceof(File)
      .refine((file: File) => file.size <= 10 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      })
      .refine((file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type), {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      }),
  });
  
  export const headlineSchema = z
    .string()
    .min(10, "Headline must be at least 10 characters")
    .max(100, "Headline must not exceed 100 characters")
    .refine((val) => val.trim().length > 0, "Professional headline is required");
  
  export const experienceSchema = z
    .number()
    .positive("Experience must be a positive number.")
    .int("Experience must be a whole number.")
    .min(1, "Experience must be at least 1 year.")
    .max(50, "Experience cannot exceed 50 years.");
  
  export const bioSchema = z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(1000, "Bio must not exceed 1000 characters")
    .refine((val) => val.trim().length > 0, "Bio is required");
  
  export const nameSchema = z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(10, "Name should be under 10 characters")
    .regex(/^[a-zA-Z]+$/, "Username must only contain alphabets");
  