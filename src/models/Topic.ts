import { Schema, model, models } from 'mongoose';
import { IQuiz, quizSchema } from '@/models/Quiz';
import { ITask, taskSchema } from '@/models/Task';

export interface TContent {
    _id: string;
    url: string;
}

export interface TTopic {
    _id: string;
    topic: string;
    content: IContent[];
    quizzes?: IQuiz[];
    tasks: ITask[];
}

export interface IContent {
    url: string;
}

export interface ITopic {
    topic: string;
    content: IContent[];
    quizzes?: IQuiz[];
    tasks: ITask[];
}

interface IContentDocument extends IContent, Document {}
interface ITopicDocument extends ITopic, Document {}

const contentSchema = new Schema<IContentDocument>({
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const topicSchema = new Schema<ITopicDocument>({
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