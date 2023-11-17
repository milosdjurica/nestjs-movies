import { Reflector } from "@nestjs/core";
import {
  ExecutionContext,
  Injectable,
  CanActivate,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class UserCanChange implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const routeId = Number(context.switchToHttp().getRequest().params.id);
    if (!routeId) {
      throw new Error("ID parameter not found!");
    }

    const { user } = context.switchToHttp().getRequest();
    const userId = user.sub;

    if (userId !== routeId) {
      throw new ForbiddenException(
        "Unauthorized: User cannot change a different user",
      );
    }
    return true;
  }
}
