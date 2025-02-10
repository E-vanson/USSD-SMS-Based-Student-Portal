import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Courses } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursePayload } from './dto/course-payload';


@Injectable()
export class CourseService {
    constructor(@InjectModel(Courses.name) private coursesModel: Model<Courses>) { }
    
    async createCourse(body: CreateCourseDto): Promise<CoursePayload>{
        const newCourse = new this.coursesModel(body);
        const course = await newCourse.save();

        return course;
    }

    async getCourses(): Promise<CoursePayload[]>{
        const courses = await this.coursesModel.find();

        if (!courses) {
            throw new NotFoundException(`No Courses found `);
        }

        return courses;
    }

    async getCourse(id: string): Promise<CoursePayload>{
        const course = await this.coursesModel.findById({ _id: id });
        if (!course) {
            throw new NotFoundException(`No Course found `);
        }

        return course;
    }

    async updateCourse(id: string, body: UpdateCourseDto): Promise<CoursePayload>{
        await this.coursesModel.updateOne({ _id: id }, body);
        const updatedCourse = await this.coursesModel.findById({ _id: id });

        if (!updatedCourse) {
            throw new NotFoundException(`Course with id:${id} not found `);
        }

        return updatedCourse;
    }

    async deleteCourse(id: string) {
        const delCourse = await this.coursesModel.findById({ _id: id });

        if (!delCourse) {
            throw new NotFoundException(`Course with id:${id} not found and could not be deleted `);
        }

        await this.coursesModel.deleteOne({ _id: id });
    }


}
