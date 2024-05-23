import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    block: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const courseSchema = new Schema({
    course: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profile_photo: {
        type: String,
    },
    messages: [messageSchema]
}, {
    timestamps: true
});

const Course = model('Course', courseSchema);

export default Course;
