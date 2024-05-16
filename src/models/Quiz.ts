import mongoose, { Schema, model } from 'mongoose';

interface IQuestion extends Document {
    question: string;
    points: Number;
    options: Object;
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

interface IAnswer extends Document {
    question: string;
    points: Number;
    options: Object;
}

const answerSchema = new Schema({
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
            },
            isElected: {
                type: Boolean,
                default: false
            }
        }],
    }
}, {
    timestamps: true
});

interface ISubmit extends Document {
    sender: string;
    grade: Number;
    answers: IAnswer;
}

const submitSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    answers: [answerSchema]
}, {
    timestamps: true
});

export interface IQuiz extends Document {
    quiz: string;
    structure: IQuestion[];
    submits: ISubmit[];
}

export const quizSchema = new Schema({
    quiz: {
        type: String,
        required: true
    },
    structure: [questionSchema],
    submits: [submitSchema],
}, {
    timestamps: true
});

const Quiz = mongoose.models.Quiz || model('Quiz', quizSchema);

export default Quiz;
