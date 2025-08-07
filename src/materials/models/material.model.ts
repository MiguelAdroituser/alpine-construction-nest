/* 
item - string
itemNumber - string
manufacturer - string
contactName - string
contactEmail - string
style - string
size - string
color - string
finishRemarks - string
grout - string
groutColor - string
cantidad(sq ft) - numeric
layour - string
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { Customer } from 'src/customers/models/customer.model';
import { Project } from 'src/projects/models/project.model';

@Schema()
export class Material extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Customer.name, required: true })
  customerId: mongoose.Types.ObjectId; //It contains the customer Id and project Id.
      
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name, required: true })
  projectId: mongoose.Types.ObjectId; //It contains the project Id and project Id.

  @Prop({ required: true })
  item: string;

  @Prop({ required: true })
  itemNumber: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true })
  contactEmail: string;

  @Prop({ required: true })
  style: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  finishRemarks: string;

  @Prop({ required: true })
  grout: string;

  @Prop({ required: true })
  groutColor: string;

  @Prop({ required: true, type: Number })
  cantidad: number;

  @Prop({ required: true })
  layout: string;

  @Prop({ required: true })
  contractorPrice: number;
  @Prop({ required: true })
  retailPrice: number;
  @Prop({ required: true })
  totalPrice: number;
  @Prop({ required: true })
  differencePrice: number;
  @Prop({ required: true })
  profit: number;
  
}

export const MaterialSchema = (mongoose.models.Material || SchemaFactory.createForClass(Material)) as Model<Material>;
/* 
  'contractorPrice',
  'retailPrice',
  'totalPrice',
  'differencePrice',
  'profit',
*/