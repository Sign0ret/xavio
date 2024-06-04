import { UserRole } from "@prisma/client";
import * as z from "zod";

export const TareasSchema = z.object({
    title: z.string().min(1, {
        message: "A title is required",
    }),
    description: z.string().min(1, {
        message: "A description is required",
    }),
    context: z.string().min(1, {
        message: "A context is required",
    }),
/*     assignation_date: z.date().safeParse(new Date()), */ 
    delivery_date: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
    }),

})

export const QuizzSchema = z.object({
    title: z.string().min(1, {
        message: "A title is required",
    }),
    difficulty: z.string().min(1, {
        message: "A difficulty is required",
    }),
    numQuestions: z.string().min(1, {
        message: "A number of questions is required",
    }),
/*     assignation_date: z.date().safeParse(new Date()), */ 
/*     delivery_date: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
    }), */
})