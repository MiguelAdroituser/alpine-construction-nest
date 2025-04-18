import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model,model,models } from 'mongoose';

@Schema()
export class Craft extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    priceMax: number;

    @Prop({ required: true })
    description: string;
}
export const CraftSchema=(mongoose.models.Craft || SchemaFactory.createForClass(Craft))as Model<Craft>