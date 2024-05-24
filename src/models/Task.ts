import { Schema, model, models } from 'mongoose';
import {ICriterion, criterionSchema} from '@/models/Rubric_criterion';

export interface TTask {
    _id: string;
    task: string;
    description: string;
    assignment_date: Date;
    deadline: Date;
    instructions: string;
    points: number;
    maxpoints: number;
    rubric: ICriterion[];
    timeexp: number;
}

export interface ITask {
    task: string;
    description: string;
    assignment_date: Date;
    deadline: Date;
    instructions: string;
    points: number;
    maxpoints: number;
    rubric: ICriterion[];
    timeexp: number;
}

interface ITaskDocument extends ITask, Document {}

export const taskSchema = new Schema<ITaskDocument>({
    task: {
        type: String,
        required: true
    },
    description: {
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
    points: {
        type: Number
    },
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
