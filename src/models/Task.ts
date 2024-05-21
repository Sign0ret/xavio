import { Schema, model, models } from 'mongoose';
import {ICriterion, criterionSchema} from '@/models/Rubric_criterion';

export interface ITask {
    task: string;
    assigment_date?: Date;
    deadline?: Date;
    instructions: string;
    points: number;
    rubric: ICriterion[];
}

interface ITaskDocument extends ITask, Document {}

export const taskSchema = new Schema<ITaskDocument>({
    task: {
        type: String,
        required: true
    },
    assigment_date: {
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
    rubric: [criterionSchema]
}, {
    timestamps: true
});

// export default models.Task || model('Task', taskSchema)
