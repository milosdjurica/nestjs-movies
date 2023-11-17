import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

// ! I could make it simpler and make it to be only Admin decorator and be like public decorator but this way
// ! But this is more flexible approach and if i add some new Roles later, it will even work with that
export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
