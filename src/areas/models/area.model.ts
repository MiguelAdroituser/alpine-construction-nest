
/* 

Room - int
Room Name - string
Craft - string
Area - string
Price - number
Direction - string
Cantidad - int
Disposal - int
Total - cantidad
Bidden - number
Total - number
Unidad usa - string
Unidad mx - string
Cantidad usa - int
Cantidad mx - int

*/
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { Craft } from 'src/crafts/models/craft.model';
import { Customer } from 'src/customers/models/customer.model';

@Schema()
export class Area extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Customer.name, required: true })
    customerId: mongoose.Types.ObjectId; //It contains the customer Id and project Id.

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Craft.name, required: true }) // ✅ Reference to Craft
    craftId: mongoose.Types.ObjectId; 

    @Prop({ required: true })
    room: number;

    @Prop({ required: true })
    roomName: string;

    @Prop({ required: true })
    craft: string;

    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    direction: string;

    @Prop({ required: true })
    cantidad: number;

    @Prop({ required: true })
    disposal: number;

    @Prop({ required: true })
    totalCantidad: number;

    @Prop({ required: true })
    bidden: number;

    @Prop({ required: true })
    total: number;

    @Prop({ required: true })
    unidadUsa: string;

    @Prop({ required: true })
    unidadMx: string;

    @Prop({ required: true })
    cantidadUsa: number;

    @Prop({ required: true })
    cantidadMx: number;
}

export const AreaSchema = (mongoose.models.Area || SchemaFactory.createForClass(Area)) as Model<Area>;
