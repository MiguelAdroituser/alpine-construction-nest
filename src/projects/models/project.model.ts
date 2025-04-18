
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { User } from 'src/modules/auth/models/user.model';

@Schema()
export class Project extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name, required: true })
    customerId: mongoose.Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    userId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    projectName: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    registrationDate: Date;
}

export const CustomerSchema = (mongoose.models.Project || SchemaFactory.createForClass(Project)) as Model<Project>;
