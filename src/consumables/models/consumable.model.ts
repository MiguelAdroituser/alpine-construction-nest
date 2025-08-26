
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { Craft } from 'src/crafts/models/craft.model';
import { Customer } from 'src/customers/models/customer.model';
import { Project } from 'src/projects/models/project.model';

@Schema()
export class Consumable extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Customer.name, required: true })
    customerId: mongoose.Types.ObjectId; //It contains the customer Id and project Id.
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name, required: true })
    projectId: mongoose.Types.ObjectId; //It contains the project Id and project Id.

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Craft.name, required: true }) // ✅ Reference to Craft
    craftId: mongoose.Types.ObjectId; 

    @Prop({ required: true })
    craft: string;

    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    consumables: string;
    
    @Prop({ required: true })
    equipment: string;

    @Prop({ required: true })
    freight: string;
    

}

export const ConsumableSchema = (mongoose.models.Consumable || SchemaFactory.createForClass(Consumable)) as Model<Consumable>;
