import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

import { AcademicsService } from 'src/academics/academics.service';

@Injectable()
export class AcademicsUserInterceptor implements NestInterceptor {
  constructor(private readonly academicsService: AcademicsService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const academic_user = await this.academicsService.findOneWithUser(
      req.params.id,
    );

    if (!academic_user) throw new BadRequestException('Academic not found');

    req.custom = {
      userId: academic_user.user.id,
      certificate: academic_user.certificate,
    };

    return next.handle().pipe(
      tap((data) => {
        return data;
      }),
    );
  }
}
