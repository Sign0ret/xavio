import { Schema, model, models } from 'mongoose';
import {criterionSchema} from '@/models/Rubric_criterion';

export const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    assigment_date: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    instructions: {
        type : String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    rubric: [criterionSchema]
}, {
    timestamps: true
});

// export default models.Task || model('Task', taskSchema)
