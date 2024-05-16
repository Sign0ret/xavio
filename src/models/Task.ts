import mongoose, { Schema, model, models } from 'mongoose';

export interface ITask extends Document {
    task: string;
}

export const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Task = mongoose.models.Task || model('Task', taskSchema);

export default Task;
