import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(BadRequestException)
export class RemoveFileOnFailedValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (fs.existsSync(request.file.path))
      fs.unlink(request.file.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });

    response.status(status).json(exception.getResponse());
  }
}
