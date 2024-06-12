import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { SkillsService } from 'src/skills/skills.service';

@Injectable()
export class SkillsUserInterceptor implements NestInterceptor {
  constructor(private readonly skillsService: SkillsService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const skill_user = await this.skillsService.findWithUser(req.params.id);

    if (!skill_user) throw new BadRequestException('Skill not found');

    req.custom = {
      userId: skill_user.user.id,
      certificate: skill_user.certificate,
    };

    return next.handle().pipe(
      tap((data) => {
        return data;
      }),
    );
  }
}
