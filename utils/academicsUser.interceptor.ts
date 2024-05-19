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
import { AcademicsService } from 'src/academics/academics.service';

@Injectable()
export class AcademicsUserInterceptor implements NestInterceptor {
  constructor(private readonly academicsService: AcademicsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const academic_user = await this.academicsService.findAcademicsWithUser(
      req.params.id,
    );
    if (!academic_user)
      throw new HttpException('Academic not found', HttpStatus.BAD_REQUEST);

    if (academic_user)
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
