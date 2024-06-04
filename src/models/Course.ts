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

export interface TCourse {
    _id: string;
    course: string;
    password?: string;
    description: string;
    profile_photo?: string;
    members: TMember[];
    messages: IMessage[];
    topics: TTopic[];
}

export interface ICourse {
    course: string;
    password?: string;
    description: string;
    profile_photo?: string;
    members: IMember[];
    messages: IMessage[];
    topics: ITopic[];
}

interface IMemberDocument extends IMember, Document {}
interface ICourseDocument extends ICourse, Document {}

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

const courseSchema = new Schema<ICourseDocument>({
    course: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    profile_photo: {
        type: String,
    },
    members: [memberSchema],
    messages: [messageSchema],
    topics: [topicSchema],

}, {
    timestamps: true
});

export default models.Course || model('Course', courseSchema)