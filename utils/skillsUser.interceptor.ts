import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SkillsService } from 'src/skills/skills.service';

@Injectable()
export class SkillsUserInterceptor implements NestInterceptor {
  constructor(private readonly skillsService: SkillsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const skill_user = await this.skillsService.findSkillWithUser(
      req.params.id,
    );
    if (!skill_user)
      throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST);

    if (skill_user)
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
