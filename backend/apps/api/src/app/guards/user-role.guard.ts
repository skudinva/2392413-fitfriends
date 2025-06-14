import { UserRole } from '@backend/shared/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserRoleGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);

    if (request.user.role === UserRole.Sportsman) {
      return true;
    }

    return false;
  }
}
