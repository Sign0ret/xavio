import { Schema, model, models } from 'mongoose';
import { IQuiz, TQuiz, quizSchema } from '@/models/Quiz';
import { ITask, TTask, taskSchema } from '@/models/Task';

export interface TSource {
    _id: string;
    name: string;
    url: string;
}

export interface TSection {
    _id: string;
    subtitle: string;
    content: string;
}

export interface TContent {
    _id: string;
    title: string;
    description: string;
    sections: TSection[];
}

export interface TTopic {
    _id: string;
    topic: string;
    brief?: string;
    contents: TContent[];
    sources: TSource[];
    quizzes?: TQuiz[];
    tasks: TTask[];
}

export interface ISource {
    name: string;
    url: string;
}

export interface ISection {
    subtitle: string;
    content: string;
}

export interface IContent {
    title: string;
    description: string;
    sections: ISection[];
}

export interface ITopic {
    topic: string;
    brief?: string;
    contents: IContent[];
    sources: ISource[];
    quizzes?: IQuiz[];
    tasks: ITask[];
}

interface ISourceDocument extends ISource, Document {}
interface ISectionDocument extends ISection, Document {}
interface IContentDocument extends IContent, Document {}
interface ITopicDocument extends ITopic, Document {}

const sourceSchema = new Schema<ISourceDocument>({
    name: {
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

const sectionSchema = new Schema<ISectionDocument>({
    subtitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const contentSchema = new Schema<IContentDocument>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sections: [sectionSchema]
}, {
    timestamps: true
});

export const topicSchema = new Schema<ITopicDocument>({
    topic: {
        type: String,
        required: true
    },
    brief: {
        type: String
    },
    contents: [contentSchema],
    sources: [sourceSchema],
    quizzes: [quizSchema],
    tasks: [taskSchema],
}, {
    timestamps: true
});

// export default models.Topic || model('Topic', topicSchema)