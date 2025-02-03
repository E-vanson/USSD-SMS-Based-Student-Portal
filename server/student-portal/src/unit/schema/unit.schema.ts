import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UnitsDocument = HydratedDocument<Units>;

@Schema()
export class Units {
    @Prop()
    name: string;

    @Prop()
    code: string;

    @Prop()
    credits: string;

    @Prop({ enum: ['!registered', 'registered', 'eRegistered', 'supp', 'retake', 'completed'], required: true, default: '!registered' })
    status: string
}
 

export const UnitsSchema = SchemaFactory.createForClass(Units);