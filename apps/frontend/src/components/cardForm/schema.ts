import { z } from "zod";

export const CardFormSchema = z.object({
  cardSet: z.string({
    required_error: "Please select a card set.",
  }),
  cardNum: z
    .string({
      required_error: "Please select a set number.",
    })
    .min(1, { message: "Please select a set number." }),
});
