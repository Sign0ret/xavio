import * as z from "zod";
export const TareasSchema = z.object({
    title: z.string().min(1, {
        message: "A title is required",
    }),
    difficulty: z.string().min(1, {
        message: "A difficulty of the task is required",
    }),
/*     assignation_date: z.date().safeParse(new Date()), */ 
    topic: z.string().min(1, {
        message: "Please select a topic",
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
    topic: z.string().min(1, {
        message: "Please select a topic",
    }),

/*     assignation_date: z.date().safeParse(new Date()), */ 
/*     delivery_date: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
    }), */
})

export const TemaSchema = z.object({
    detail: z.string().min(1, {
        message: "A detail is required",
    }),
    topic: z.string().min(1, {
        message: "A topic is required",
    })
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

export const SubscribeSchema = z.object({
    id: z.string().min(1, {
        message: "An id is required",
    }),
    password: z.string().min(8, {
        message: "A Password with at least 8 characters is required",
    })
})

export const CourseSchema = z.object({
    id: z.string().optional(),
    course: z.string().min(1, {
        message: "A course name is required",
    }),
    password: z.string().min(8, {
        message: "A Password with at least 8 characters is required",
    }),
    description: z.string().min(1, {
        message: "A description is required",
    }),
    profile_photo: z.string().optional(),
    topics: z.array(TopicSchema).optional(),
    members: z.array(MemberSchema).optional(),
})