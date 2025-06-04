import { UserRole } from '@backend/shared/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CoachRoleGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.role === UserRole.Coach) {
      return true;
    }

    return false;
  }
}
