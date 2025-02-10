import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student{

    @Prop()
    fullName: string;

    @Prop()
    email: string;

    @Prop()
    phoneNo: string;

    @Prop()
    regNo: string;

    @Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Courses' }] })
    course: mongoose.Schema.Types.ObjectId;

    @Prop()
    notifications: string[];    

    @Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Units' }] })
    units: [
            {
                unitId: mongoose.Schema.Types.ObjectId,
                cat1Grade: string,
                cat2Grade: string,
                examGrade: string,
                finalGrade: string
            }
    ]
}


export const StudentSchema = SchemaFactory.createForClass(Student);