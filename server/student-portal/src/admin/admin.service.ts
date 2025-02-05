import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Admin } from './schema/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminPayload } from './dto/admin-payload';
import { UpdateAdminDto } from './dto/update-admin.dto';


@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>){}

    async createAdmin(body: CreateAdminDto): Promise<AdminPayload> {
        const newAdmin = new this.adminModel(body);
        const admin = await newAdmin.save();

        return admin;
    }

    async updateAdmin(id: string, body: UpdateAdminDto): Promise<AdminPayload> {
        await this.adminModel.updateOne({ _id: id }, body);
        const updatedAdmin = await this.adminModel.findById(id);

        return updatedAdmin!;
    }

    async deleteAdmin(id: string) {
        await this.adminModel.deleteOne({ _id: id });
    }

    async getAdmins(): Promise<AdminPayload[]> {
        const admins = await this.adminModel.find();

        return admins;
    }

    async getAdmin(id: string): Promise<AdminPayload> {
        const admin = await this.adminModel.findById({ _id: id });

        return admin!;
    }
    
}
