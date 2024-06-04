import { UserRole } from "@prisma/client";
import * as z from "zod";
import { object, string, array, optional } from 'zod';
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

export const TopicSchema = z.object({
    topic: z.string().min(1, {
        message: "A topic name is required",
    }),
    brief: z.string().min(1, {
        message: "A brief is required",
    }),
    content: z.array(TareasSchema).optional(),
    extra: z.array(TareasSchema).optional(),
    quizzes: z.array(QuizzSchema).optional(),
    tasks: z.array(TareasSchema).optional()
})

export const MemberSchema = z.object({
    member: z.string().min(1, {
        message: "A member id is required",
    }),
    admin: z.boolean(),
})

export const CourseSchema = z.object({
    course: z.string().min(1, {
        message: "A course name is required",
    }),
    description: z.string().min(1, {
        message: "A description is required",
    }),
    profile_photo: z.string().optional(),
    topics: z.array(TopicSchema).optional(),
    members: z.array(MemberSchema).optional(),
})