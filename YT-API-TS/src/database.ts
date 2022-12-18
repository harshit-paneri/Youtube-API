import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  thumbnails: {
    default: String,
    medium: String,
    high: String,
};
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    id: String,
    title: String,
    description: String,
    publishedAt: Date,
    thumbnails: {
        default: String,
        medium: String,
        high: String,
    }
});

// 3. Create a Model.
const user = model<IUser>('User', userSchema);

export {user}