import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common';

import { CourseService } from 'src/course/course.service';
import { CreateCourseDto } from 'src/course/dto/create-course.dto';
import { UpdateCourseDto } from 'src/course/dto/update-course.dto';

@Controller({path: 'course', version: '1'})
export class CourseController {
    constructor(private courseService: CourseService){}

    @Get()
    getCourses() {
        return this.courseService.getCourses();
    }

    @Get('/:id')
    getCourse(@Param('id') id: string) {
        return this.courseService.getCourse(id)
    }

    @Post()
    createCourse(@Body() body: CreateCourseDto) {
        return this.courseService.createCourse(body);
    }

    @Put('/:id')
    updateCourse(@Param('id') id: string, @Body() body: UpdateCourseDto) {
        return this.courseService.updateCourse(id, body);
    }

    @Delete('/:id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id)
    }
}
