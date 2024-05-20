import { Schema, model, models } from 'mongoose';
import { messageSchema } from '@/models/Message';
import { topicSchema } from '@/models/Topic';

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

export default models.Course || model('Course', courseSchema)