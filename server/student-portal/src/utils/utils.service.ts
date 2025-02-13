import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class UtilsService {
    constructor(private adminService: AdminService){}

    async isAdmin(variant: string): Promise<boolean> {
        const admin = await this.adminService.getAdminByEmail(variant);

        if (admin) {
            return true;
        }

        return false;
    }
}
