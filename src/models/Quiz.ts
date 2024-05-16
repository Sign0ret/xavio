import mongoose, { Schema, model } from 'mongoose';

interface IQuestion extends Document {
    quiz: string;
    structure: object;
}

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    options: {
        type: [{
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }],
        validate: [arrayLength, '{PATH} must be between 2 and 5 options']
    }
}, {
    timestamps: true
});

function arrayLength(val: any) {
    return val.length >= 2 && val.length <= 5;
}

export interface IQuiz extends Document {
    quiz: string;
    structure: IQuestion[];
}

export const quizSchema = new Schema({
    quiz: {
        type: String,
        required: true
    },
    structure: [questionSchema],
}, {
    timestamps: true
});

const Quiz = mongoose.models.Quiz || model('Quiz', quizSchema);

export default Quiz;
