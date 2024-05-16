import mongoose, { Schema, model } from 'mongoose';

export interface IMessage extends Document {
    sender: string;
    message: string;
    block: number;
}

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

const Message = mongoose.models.Message || model('Message', messageSchema);

export default Message;
