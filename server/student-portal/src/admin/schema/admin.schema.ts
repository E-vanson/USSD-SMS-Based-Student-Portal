import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema( {collection: 'admins', timestamps: true} )
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