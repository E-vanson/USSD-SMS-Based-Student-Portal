import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AdminService } from 'src/admin/admin.service';
import { StudentService } from 'src/student/student.service';
import { SignInDto } from './dto/signIn.dto';
import { Public } from 'src/decorators/auth.decorator';

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private studentService: StudentService,
        private jwtService: JwtService
    ) { } 

    @Public()
    async signIn(body: SignInDto): Promise<{ access_token: string }> {
        const admin = await this.adminService.getAdminByEmail(body.variant);
        if (admin) {
            const isMatch = await bcrypt.compare(body.password ,admin.password);
            if (isMatch) {
                const payload = { email: admin.email }
                return { access_token: await this.jwtService.signAsync(payload)}
            } else {
                throw new NotFoundException(`Invalid Credentials`)
            }
        }

        const student = await this.studentService.getStudentByRegNo(body.variant);        
        if (student) {
            const isMatch = await bcrypt.compare(body.password ,student.password);
            if (isMatch) {
                const payload = { regNo: student.regNo }
                return { access_token: await this.jwtService.signAsync(payload)}
            } else {
                throw new NotFoundException(`Invalid Credentials`)
            }
        } else {
            throw new NotFoundException(`Invalid Credentials`)
        }
    }
}
