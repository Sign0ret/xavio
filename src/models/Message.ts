import { Schema, model, models } from 'mongoose';

export interface NameMember {
    _id: string;
    member: string;
    admin: boolean;
    name: string;
  }
  

export interface TMessage {
    _id: string;
    sender: string;
    message: string;
    block: number;
    createdAt: Date;
}

export interface IMessage {
    sender: string;
    message: string;
    block: number;
}

interface IMessageDocument extends IMessage, Document {}

export const messageSchema = new Schema<IMessageDocument>({
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