import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AdminService } from 'src/admin/admin.service';
import { StudentService } from 'src/student/student.service';
import { AdminSignInDto,} from './dto/adminSignIn.dto';
import { UserSigninDto } from './dto/userSignIn.dto';

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private studentService: StudentService,
        private jwtService: JwtService
    ) { }   

    async adminSignIn(body: AdminSignInDto): Promise<{ access_token: string }>  {
        try {
            const admin = await this.adminService.getAdminByEmail(body.email);

        if (!admin) {
            throw new NotFoundException("Invalid Credentials")
        }

        const isMatch = await bcrypt.compare(body.password ,admin.password);
        if (isMatch) {
            const payload = { email: admin.email }
            return { access_token: await this.jwtService.signAsync(payload)}
        } else {
            throw new NotFoundException(`Invalid Credentials`)
        }
        } catch (error) {
            throw new InternalServerErrorException("Server Errror");
        }
        
    }

    async studentSignIn(body: UserSigninDto): Promise<{ access_token: string }>  {
        try {
            const student = await this.studentService.getStudentByRegNo(body.regNo);

        if (!student) {
            throw new NotFoundException("Invalid Credentials");
        }

        const isMatch = await bcrypt.compare(body.password ,student.student?.password);
        if (isMatch) {
            const payload = { email: student.student?.email }
            return { access_token: await this.jwtService.signAsync(payload)}
        } else {
            throw new NotFoundException(`Invalid Credentials`)
        } 
            
        } catch (error) {
            throw new InternalServerErrorException("Server Errror");
        }
        
    }
}
