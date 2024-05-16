import { Schema, model, models } from 'mongoose';

export const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// export default models.Task || model('Task', taskSchema)
