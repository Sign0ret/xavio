import { Schema, model, models } from 'mongoose';
import { quizSchema } from '@/models/Quiz';
import { taskSchema } from '@/models/Task';

export const topicSchema = new Schema({
    topic: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// export default models.Topic || model('Topic', topicSchema)