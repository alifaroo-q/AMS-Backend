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
import { ProfilesService } from 'src/profiles/profiles.service';
import { SkillsService } from 'src/skills/skills.service';

@Injectable()
export class ProfileResumeUserInterceptor implements NestInterceptor {
  constructor(private readonly profilesService: ProfilesService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const profile_user = await this.profilesService.findOne(req.params.id);
    if (!profile_user)
      throw new HttpException('Profile not found', HttpStatus.BAD_REQUEST);

    if (profile_user)
      req.custom = {
        userId: profile_user.user.id,
        resume: profile_user.resume,
      };

    return next.handle().pipe(
      tap((data) => {
        return data;
      }),
    );
  }
}
