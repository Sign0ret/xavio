import { Schema, model, models } from 'mongoose';

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

// export default models.Quiz || model('Quiz', quizSchema)
