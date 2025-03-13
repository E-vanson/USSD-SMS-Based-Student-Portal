import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Admin } from './schema/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminPayload } from './dto/admin-payload';
import { UpdateAdminDto } from './dto/update-admin.dto';


@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>){}

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
   
}
