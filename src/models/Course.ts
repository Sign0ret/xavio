import { Schema, model, models } from 'mongoose';
import { IMessage, messageSchema } from '@/models/Message';
import { ITopic, topicSchema } from '@/models/Topic';
import { object } from 'zod';



export interface TCourse {
    _id: string;
    course: string;
    description: string;
    profile_photo?: string;
    messages: IMessage[];
    topics: ITopic[];
}

export interface ICourse {
    course: string;
    description: string;
    profile_photo?: string;
    messages: IMessage[];
    topics: ITopic[];
}

interface ICourseDocument extends ICourse, Document {}

const courseSchema = new Schema<ICourseDocument>({
    course: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profile_photo: {
        type: String,
    },
    messages: [messageSchema],
    topics: [topicSchema],

}, {
    timestamps: true
});

export default models.Course || model('Course', courseSchema)