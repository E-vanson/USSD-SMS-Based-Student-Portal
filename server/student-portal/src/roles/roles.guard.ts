import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from './roles.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorators';
import { UtilsService } from 'src/utils/utils.service';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector, private utilService:UtilsService){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    return this.utilService.isAdmin(user.email);
  }
}
