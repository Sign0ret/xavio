import { Schema, model, models } from 'mongoose';

export const messageSchema = new Schema({
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

// export default models.Message || model('Message', messageSchema)