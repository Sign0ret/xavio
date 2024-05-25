import { Schema, model, models } from 'mongoose';
import { IQuiz, TQuiz, quizSchema } from '@/models/Quiz';
import { ITask, TTask, taskSchema } from '@/models/Task';

export interface TExtra {
    _id: string;
    extra: string;
    brief: string;
    url: string;
}

export interface TContent {
    _id: string;
    content: string;
    brief: string;
    url: string;
}

export interface TTopic {
    _id: string;
    topic: string;
    brief: string;
    content: TContent[];
    extra: TExtra[];
    quizzes?: TQuiz[];
    tasks: TTask[];
}

export interface IExtra {
    extra: string;
    brief: string;
    url: string;
}

export interface IContent {
    content: string;
    brief: string;
    url: string;
}

export interface ITopic {
    topic: string;
    brief: string;
    content: IContent[];
    extra: IExtra[];
    quizzes?: IQuiz[];
    tasks: ITask[];
}

interface IExtraDocument extends IExtra, Document {}
interface IContentDocument extends IContent, Document {}
interface ITopicDocument extends ITopic, Document {}

const extraSchema = new Schema<IExtraDocument>({
    extra: {
        type: String,
        required: true
    },
    brief: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const contentSchema = new Schema<IContentDocument>({
    content: {
        type: String,
        required: true
    },
    brief: {
        type: String,
        required: true
    },
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
    brief: {
        type: String,
        required: true
    },
    content: [contentSchema],
    extra: [extraSchema],
    quizzes: [quizSchema],
    tasks: [taskSchema],
}, {
    timestamps: true
});

// export default models.Topic || model('Topic', topicSchema)