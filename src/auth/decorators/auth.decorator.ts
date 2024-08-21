import { applyDecorators, UseGuards } from '@nestjs/common';

import { Role } from '../interface/role';
import { Roles } from './roles.decorator';
import { AccessTokenGuard, RolesGuard } from '../guards';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AccessTokenGuard, RolesGuard),
  );
}
