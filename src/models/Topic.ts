import mongoose, { Schema, model } from 'mongoose';
import { IQuiz, quizSchema } from '@/models/Quiz';
import { ITask, taskSchema } from '@/models/Task';

export interface ITopic extends Document {
    topic: string;
    quizzes: IQuiz;
    tasks: ITask;
}

export const topicSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    quizzes: [quizSchema],
    tasks: [taskSchema]
}, {
    timestamps: true
});

const Topic = mongoose.models.Topic || model('Topic', topicSchema);

export default Topic;
