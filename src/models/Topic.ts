import mongoose, { Schema, model } from 'mongoose';
import { IQuiz, quizSchema } from '@/models/Quiz';

export interface ITopic extends Document {
    topic: string;
    quizzes: IQuiz;
}

export const topicSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    quizzes: [quizSchema]
}, {
    timestamps: true
});

const Topic = mongoose.models.Topic || model('Topic', topicSchema);

export default Topic;
