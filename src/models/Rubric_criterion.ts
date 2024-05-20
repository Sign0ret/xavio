import { Schema, model, models } from 'mongoose';

export const criterionSchema = new Schema({
    criterion: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});







