import { Schema, model, models } from 'mongoose';
import { IMessage, messageSchema } from '@/models/Message';
import { ITopic, TTopic, topicSchema } from '@/models/Topic';

export interface TMember {
    _id: string;
    member: string;
    admin: boolean;
}

export interface IMember {
    member: string;
    admin: boolean;
}

export interface TCourseAI {
    _id: string;
    course: string;
    description_course: string;
    members: TMember[];
    topics: TTopic[];
}

export interface ICourseAI {
    course: string;
    description_course: string;
    members: IMember[];
    topics: ITopic[];
}

interface IMemberDocument extends IMember, Document {}
interface ICourseAIDocument extends ICourseAI, Document {}

const memberSchema = new Schema<IMemberDocument>({
    member: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const courseAISchema = new Schema<ICourseAIDocument>({
    course: {
        type: String,
        required: true
    },
    description_course: {
        type: String,
        required: true
    },
    members: [memberSchema],
    topics: [topicSchema],

}, {
    timestamps: true
});

export default models.CourseAI || model('CourseAI', courseAISchema)