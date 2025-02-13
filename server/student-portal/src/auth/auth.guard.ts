import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/decorators/auth.decorator';

// Guards have a single responsibility.
//  They determine whether a given request will be handled by the route handler or not
// depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.
// Guards have access to the ExecutionContext instance,
//  and thus know exactly what's going to be executed next


//  reflector helps retrieve metadata that you attach to controllers
//  or route handlers using custom decorators.
// getAllAndOverride looks for metadata with a specific key (here, IS_PUBLIC_KEY)
// on multiple targets—in this case, first on the route handler (context.getHandler()) 
// and then on the class (context.getClass()).
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(isPublic, " is the route allowed.....")
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });    
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

