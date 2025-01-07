import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    // _id should be of type ObjectId (default in MongoDB)
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: Boolean, default: false })
    isAdmin: boolean;
}
export const UserSchema = (mongoose.models.User || SchemaFactory.createForClass(User)) as Model<User>;