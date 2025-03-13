import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Admin } from './schema/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminPayload } from './dto/admin-payload';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Student } from 'src/student/schema/student.schema';
import { Courses } from 'src/course/schema/course.schema';
import { Units } from 'src/unit/schema/unit.schema';
import { StudentPayload } from 'src/student/dto/student-payload';
import { StudentService } from 'src/student/student.service';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        @InjectModel(Student.name) private studentModel: Model<Student>,
        @InjectModel(Courses.name) private coursesModel: Model<Courses>,
        @InjectModel(Units.name) private unitsModel: Model<Units>,
        private studentService:StudentService
    
    ) { }

    async createAdmin(body: CreateAdminDto): Promise<AdminPayload> {
        
        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(body.password, salt);
        const newAd = {
            fullName: body.fullName,
            email: body.email,
            phoneNo: body.phoneNo,
            notifications: body.notifications,
            password: passwordHash
        };

        const newAdmin = new this.adminModel(newAd);
        const admin = await newAdmin.save();

        return admin;
    }

    async getAdmins(): Promise<AdminPayload[]> {
        const admins = await this.adminModel.find();

        return admins;
    }

    async getAdmin(id: string): Promise<AdminPayload> {
        const admin = await this.adminModel.findOne({ _id: id });

        return admin!;
    }

    async getAdminByEmail(email: string): Promise<AdminPayload | null>{
        try {
            const admin = await this.adminModel.findOne({ email: email });
            
            if (!admin) {            
                return null;
            }                        

            return admin;            
        } catch (error) {
            throw new InternalServerErrorException("DB query error!!");                    
        }        
    }

    async updateAdmin(id: string, body: UpdateAdminDto): Promise<AdminPayload> {
        await this.adminModel.updateOne({ _id: id }, body);
        const updatedAdmin = await this.adminModel.findById(id);

        return updatedAdmin!;
    }

    async deleteAdmin(id: string) {
        await this.adminModel.deleteOne({ _id: id });
    }

    async adminStats(): Promise<number>{
        try {
            console.log("I'm at stats...") 
            const adminNo = await this.adminModel.countDocuments();
            return adminNo                                
        } catch (error) {
            throw new InternalServerErrorException("Couldn't get admin count");            
        }
    }

    async studentStats(): Promise<number>{
        try {
            const studentNo = await this.studentModel.countDocuments();
            return studentNo;
        } catch (error) {
            throw new InternalServerErrorException("Couldn't get student count");           
        }
    }

    async courseStats(): Promise<number>{
        try {
            const coursesNo = await this.coursesModel.countDocuments();
            return coursesNo;
        } catch (error) {
            throw new InternalServerErrorException("Couldn't get courses count");           
        }
    }

    async unitsStats(): Promise<number>{
        try {
            const unitsNo = await this.unitsModel.countDocuments();
            return unitsNo;
        } catch (error) {
            throw new InternalServerErrorException("Couldn't get units count");           
        }
    }

    async getStats(): Promise<object>{
        try {
            const students = await this.studentStats();
            const admins = await this.adminStats();
            const courses = await this.courseStats();
            const units = await this.unitsStats();

            const stats = {
                students: students,
                admins: admins,
                courses: courses,
                units: units
            }

            return stats;
        } catch (error) {
            throw new InternalServerErrorException("Error getting stats!!")
        }
    }

    async getStudents(): Promise<StudentPayload[]>{
        try {
            const students = await this.studentService.getStudents();        
            return students;
        } catch (error) {
            throw new InternalServerErrorException("Couldn't retrive students")            
        }
    }
   
}
