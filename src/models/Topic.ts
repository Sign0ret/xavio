import { Schema, model, models } from 'mongoose';
import { quizSchema } from '@/models/Quiz';
import { taskSchema } from '@/models/Task';

const contentSchema = new Schema({
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const topicSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    content: [contentSchema],
    quizzes: [quizSchema],
    tasks: [taskSchema],
}, {
    timestamps: true
});

// export default models.Topic || model('Topic', topicSchema)