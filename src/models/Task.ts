import { Schema, model, models } from 'mongoose';
import {criterionSchema} from '@/models/Rubric_criterion';

export const taskSchema = new Schema({
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
