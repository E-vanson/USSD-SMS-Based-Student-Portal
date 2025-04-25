import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Courses } from 'src/course/schema/course.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class UnitsGradeSchema {
    @Prop()
    unitId: mongoose.Schema.Types.ObjectId;

    @Prop()
    cat1Grade: string;

    @Prop()
    cat2Grade: string;

    @Prop()
    examGrade: string;

    @Prop()
    finalGrade: string;

}

@Schema()
export class Student{

    @Prop()
    fullName: string;

    @Prop()
    email: string;

    @Prop()
    phoneNo: string;

    @Prop()
    password: string;

    @Prop()
    regNo: string;

    @Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Courses' }] })
    course: mongoose.Schema.Types.ObjectId;

    @Prop()
    courseName: string;

    @Prop()
    notifications: string[];    

    @Prop({ type: [UnitsGradeSchema] })
    units: UnitsGradeSchema[]
}


export const StudentSchema = SchemaFactory.createForClass(Student);