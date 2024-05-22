import { Schema, Document, model } from 'mongoose';

export interface TOption {
    _id: string;
    text: string;
    isCorrect?: boolean;
    isElected?: boolean;
}

export interface TQuestion {
    _id: string;
    question: string;
    points: number;
    options: IOption[];
}

export interface TAnswer {
    _id: string;
    question: string;
    points: number;
    options: IOption[];
}

export interface TSubmit {
    _id: string;
    sender: string;
    grade: number;
    answers: IAnswer[];
}

export interface TQuiz {
    _id: string;
    quiz: string;
    structure: IQuestion[];
    submits: ISubmit[];
    assignment_date?: Date;
    deadline?: Date;
}

export interface IOption {
    text: string;
    isCorrect?: boolean;
    isElected?: boolean;
}

export interface IQuestion {
    question: string;
    points: number;
    options: IOption[];
}

export interface IAnswer {
    question: string;
    points: number;
    options: IOption[];
}

export interface ISubmit {
    sender: string;
    grade: number;
    answers: IAnswer[];
}

export interface IQuiz {
    quiz: string;
    structure: IQuestion[];
    submits: ISubmit[];
    assignment_date?: Date;
    deadline?: Date;
}

interface IOptionDocument extends IOption, Document {}
interface IQuestionDocument extends IQuestion, Document {}
interface IAnswerDocument extends IAnswer, Document {}
interface ISubmitDocument extends ISubmit, Document {}
export interface IQuizDocument extends IQuiz, Document {}

const optionSchema = new Schema<IOptionDocument>({
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
});

const questionSchema = new Schema<IQuestionDocument>({
    question: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    options: {
        type: [optionSchema],
        validate: [arrayLength, '{PATH} must be between 2 and 5 options']
    }
}, {
    timestamps: true
});

const answerSchema = new Schema<IAnswerDocument>({
    question: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    options: {
        type: [optionSchema],
    }
}, {
    timestamps: true
});

const submitSchema = new Schema<ISubmitDocument>({
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

export const quizSchema = new Schema<IQuizDocument>({
    quiz: {
        type: String,
        required: true
    },
    structure: [questionSchema],
    submits: [submitSchema],
    assignment_date: {
        type: Date,
        //required: true
    },
    deadline: {
        type: Date,
        //required: true
    },
}, {
    timestamps: true
});

function arrayLength(val: any) {
    return val.length >= 2 && val.length <= 5;
}