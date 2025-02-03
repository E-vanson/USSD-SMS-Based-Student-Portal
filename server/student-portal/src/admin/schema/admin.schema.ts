import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin{

    @Prop()
    fullName: string;

    @Prop()
    email: string;

    @Prop()
    phoneNo: string;

    @Prop()
    notifications: string[];

}

export const AdminSchema = SchemaFactory.createForClass(Admin);