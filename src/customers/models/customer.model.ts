/* 

customerName
proyectName
userId


*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { User } from 'src/modules/auth/models/user.model';

@Schema()
export class Customer extends Document {
    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true })
    projectName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    userId: mongoose.Types.ObjectId;
}

export const CustomerSchema = (mongoose.models.Customer || SchemaFactory.createForClass(Customer)) as Model<Customer>;
