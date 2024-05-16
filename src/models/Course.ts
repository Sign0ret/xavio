import mongoose, { Schema, model } from 'mongoose';
import { IMessage, messageSchema } from '@/models/Message';
import { ITopic, topicSchema } from '@/models/Topic';

export interface ICourse extends Document {
    course: string;
    description: string;
    profile_photo: string;
    messages: IMessage[];
    topics: ITopic[];
}

const courseSchema = new Schema({
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

const Course = mongoose.models.Course || model('Course', courseSchema);

export default Course;
