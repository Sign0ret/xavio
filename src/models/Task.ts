import { Schema, model, models } from 'mongoose';
import {ICriterion, TCriterion, criterionSchema} from '@/models/Rubric_criterion';

export interface TSubmitT {
    _id: string;
    sender: string;
    grade: number;
    text?: string;
    url?: string;
    comments?: string;
    rubric: TCriterion[];
    updatedAt: Date;
}

export interface TTask {
    _id: string;
    task: string;
    brief: string;
    assignment_date?: Date;
    deadline?: Date;
    instructions: string;
    submits: TSubmitT[];
    maxpoints: number;
    rubric: ICriterion[];
    timeexp: number;
}

export interface ISubmitT {
    sender: string;
    grade: number;
    text?: string;
    url?: string;
    comments?: string;
    rubric: ICriterion[];
}

export interface ITask {
    task: string;
    brief: string;
    assignment_date?: Date;
    deadline?: Date;
    instructions: string;
    submits: ISubmitT[];
    maxpoints: number;
    rubric: ICriterion[];
    timeexp: number;
}

interface ITaskDocument extends ITask, Document {}
interface ISubmitTDocument extends ISubmitT, Document {}

const submitTSchema = new Schema<ISubmitTDocument>({
    sender: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    text: {
        type: String,
    },
    url: {
        type: String,
    },
    comments: {
        type: String,
    },
    rubric: [criterionSchema]
}, {
    timestamps: true
});

export const taskSchema = new Schema<ITaskDocument>({
    task: {
        type: String,
        required: true
    },
    brief: {
        type: String
    },
    assignment_date: {
        type: Date
    },
    deadline: {
        type: Date
    },
    instructions: {
        type : String
    },
    submits: [submitTSchema],
    maxpoints: {
        type: Number
    },
    timeexp: {
        type: Number,
    },
    rubric: [criterionSchema]
}, {
    timestamps: true
});

// export default models.Task || model('Task', taskSchema)
