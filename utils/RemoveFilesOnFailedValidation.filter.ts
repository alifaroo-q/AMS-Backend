import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(BadRequestException)
export class RemoveFilesOnFailedValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const getFiles = (
      files: Express.Multer.File[] | unknown | undefined,
    ): Array<Express.Multer.File> => {
      if (!files) return [];
      if (Array.isArray(files)) return files;
      return Object.values(files);
    };

    const filePaths = getFiles(request.files);

    for (const file of filePaths) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }

    response.status(status).json(exception.getResponse());
  }
}
