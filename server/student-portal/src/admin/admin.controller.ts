import { Controller, Post, Put, Get, Delete, Body, Param } from '@nestjs/common';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Public } from 'src/decorators/auth.decorator';

@Controller({path: 'admin', version: '1'})
export class AdminController {
    constructor(private adminService: AdminService){}

    @Public()
    @Get()
    getAdmins() {
        return this.adminService.getAdmins();
    }
 
    @Get('/:id')
    getAdmin(@Param('id') id: string) {
        return this.adminService.getAdmin(id);
    }

    @Post()
    createAdmin(@Body() body: CreateAdminDto) {
        return this.adminService.createAdmin(body);
    }

    @Put('/:id')
    updateAdmin(@Param('id') id: string, @Body() body: UpdateAdminDto) {
        return this.adminService.updateAdmin(id, body);
    }

    @Delete('/:id')
    deleteAdmin(@Param('id') id: string) {
        return this.adminService.deleteAdmin(id);
    }
}
