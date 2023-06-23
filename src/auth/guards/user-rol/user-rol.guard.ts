import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/rol-protected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRolGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    if(!validRoles) return true;
    if(validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User; 

    if(!user)
      throw new BadRequestException('User not found')

    for (const rol of user.roles) {
      if(validRoles.includes(rol)){
        return true
      }
    }

    throw new ForbiddenException('el usuario no tiene ul rol valido')
  }
}
