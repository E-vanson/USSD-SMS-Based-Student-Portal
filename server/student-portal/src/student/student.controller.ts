import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common';

import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller({path: 'student', version: '1'})
export class StudentController {
    constructor(private studentService: StudentService) { }
    
    @Get()
    getStudents() {
        return this.studentService.getStudents();
    }

    @Get('/:id')
    getStudent(@Param('id') id: string) {
        return this.studentService.getStudent(id)
    }

    @Post()
    createStudent(@Body() body: CreateStudentDto) {
        return this.studentService.createStudent(body);
    }

    @Put('/:id')
    updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
        return this.studentService.updateStudent(id, body);
    }

    @Delete('/:id')
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id)
    }
}
