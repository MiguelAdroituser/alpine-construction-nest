/* 

customerName
proyectName
userId


*/

/*New fields
    CompanyName
    PhoneNumber
    EmailAddress
    Address
    RegistrationDate(System Time Default)
*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { User } from 'src/modules/auth/models/user.model';

@Schema()
export class Customer extends Document {
    @Prop({ required: false })
    customerName: string;

    /* @Prop({ required: true })
    projectName: string; */

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    userId: mongoose.Types.ObjectId;

    /*Nuevos*/
    @Prop({ required: false })
    companyName: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    emailAddress: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    registrationDate: Date;
}

export const CustomerSchema = (mongoose.models.Customer || SchemaFactory.createForClass(Customer)) as Model<Customer>;
