import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/schema/admin.schema';

@Injectable()
export class UtilsService {
    constructor(private adminService: AdminService,  @InjectModel(Admin.name) private adminModel: Model<Admin>){}

    async isAdmin(variant: string): Promise<boolean> {
        const admin = await this.adminService.getAdminByEmail(variant);

        if (admin) {
            return true;
        }

        return false;
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
}
