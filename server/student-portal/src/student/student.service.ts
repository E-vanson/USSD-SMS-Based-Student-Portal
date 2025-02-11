import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Student } from './schema/student.schema';
import { CourseService } from 'src/course/course.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentPayload } from './dto/student-payload';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private studentModel: Model<Student>, private courseService:CourseService) { }
    
    async createStudent(body: CreateStudentDto): Promise<StudentPayload>{
        const courseId = body.course;
        console.log(courseId, " The course id.....")
        const course = await this.courseService.getCourse(courseId);

        if (!course) {
            throw new NotFoundException(`Course not found `);
        }

        const units = course?.units?.flat();
        console.log(units, " the units....")

        const name = body.fullName;
        const email = body.email;
        const phoneNo = body.phoneNo;
        const regNo = body.regNo;
        const not = body.notifications;

        const newStudent = new this.studentModel({
            fullName: name,
            email: email,
            phoneNo: phoneNo,
            regNo: regNo,
            notifications: not,
            units: units?.map(unitId => ({
                unitId: unitId,
                cat1Grade: null,
                cat2Grade: null,
                examGrade: null,
                finalGrade: null
            }))
        })

        const student = await newStudent.save();

        return student;
    }

    async getStudents(): Promise<StudentPayload[]>{
        const students = await this.studentModel.find();

        if (!students) {
            throw new NotFoundException(`No Students found `);
        }

        return students;
    }

    async getStudent(id: string): Promise<StudentPayload>{
        const student = await this.studentModel.findById({ _id: id });

        if (!student) {
            throw new NotFoundException(`No Student found of id ${id} `);
        }

        return student;
    }

    async getStudentByRegNo(regNo: string): Promise<StudentPayload>{
        const student = await this.studentModel.findOne({ regNo: regNo });

        if (!student) {
            throw new NotFoundException(`No Student found of regNo ${regNo} `);
        }

        return student;
    }

    async updateStudent(id: string, body: UpdateStudentDto): Promise<StudentPayload>{
        await this.studentModel.updateOne({ _id: id }, body);

        const updatedUnit = await this.studentModel.findById({ _id: id });

        if (!updatedUnit) {
            throw new NotFoundException(`No Student found of id ${id} `);
        }

        return updatedUnit;
    }

    async deleteStudent(id: string){
        const delStudent = await this.studentModel.findById({ _id: id });

        if (!delStudent) {
            throw new NotFoundException(`No Student found of id ${id}`);
        }

        await this.studentModel.deleteOne({ _id: id });
    }
}
