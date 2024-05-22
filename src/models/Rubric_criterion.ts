import { Schema, model, models } from 'mongoose';

export interface TCriterion {
    _id: string;
    criterion: string;
    points: number;
}

export interface ICriterion {
    criterion: string;
    points: number;
}

interface ICriterionDocument extends ICriterion, Document {}

export const criterionSchema = new Schema<ICriterionDocument>({
    criterion: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});