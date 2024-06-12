import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class ProfileResumeUserInterceptor implements NestInterceptor {
  constructor(private readonly profilesService: ProfilesService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();

    const profile = await this.profilesService.findOne(req.params.id);
    if (!profile) throw new BadRequestException('Profile not found');

    req.custom = {
      userId: profile.user.id,
      resume: profile.resume,
    };

    return next.handle().pipe(
      tap((data) => {
        return data;
      }),
    );
  }
}
