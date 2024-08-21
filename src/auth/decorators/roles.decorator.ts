import { SetMetadata } from '@nestjs/common';

import { Role } from '../interface/role';

export const META_ROLES = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(META_ROLES, roles);
