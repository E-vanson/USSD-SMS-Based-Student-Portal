import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CoursesDocument = HydratedDocument<Courses>;

@Schema()
export class Courses {
    @Prop()
    name: string;

    @Prop()
    code: string;

    @Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Units' }] })
    units: mongoose.Schema.Types.ObjectId[];
}
 
 export const CoursesSchema = SchemaFactory.createForClass(Courses);