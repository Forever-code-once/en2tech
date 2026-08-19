import { z } from "zod";

/**
 * One schema, imported by both the client form and the API route. The client
 * uses it for instant inline feedback; the server re-validates the same rules
 * because client-side validation is a convenience, never a control.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(254, "That email address is too long.")
    .email("That doesn't look like a valid email address."),
  company: z
    .string()
    .trim()
    .max(120, "That company name is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters.")
    .max(5000, "That message is too long. Please keep it under 5,000 characters."),
  /**
   * Honeypot. Real users never see this field, so any value means a bot.
   * Named `website` because that is what naive form-filling bots target.
   */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field-level errors keyed by field name, as returned to the client. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactResponse = {
  success: boolean;
  message: string;
  errors?: ContactFieldErrors;
};
