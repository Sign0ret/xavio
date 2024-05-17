import { Schema, model, models } from 'mongoose';
import { messageSchema } from '@/models/Message';
import { topicSchema } from '@/models/Topic';
import { quizSchema } from '@/models/Quiz';
import { taskSchema } from '@/models/Task';


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
    quizzes: [quizSchema],
    tasks: [taskSchema]
}, {
    timestamps: true
});

export default models.Course || model('Course', courseSchema)