import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const MulterFileUpload = (options: {
  uploadLocation: string;
  allowedFiles: string[];
}): MulterOptions => {
  return {
    limits: { fileSize: 4 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      const ext = path.parse(file.originalname).ext;
      if (!options.allowedFiles.includes(ext)) {
        req.fileValidationError = 'Invalid file type';
        return callback(
          new BadRequestException('Invalid File Type: ' + ext),
          false,
        );
      }
      return callback(null, true);
    },
    storage: diskStorage({
      destination: options.uploadLocation,
      filename: (req: any, file, cb) => {
        const fn = path.parse(file.originalname);
        const filename = `${fn.name}-${new Date().getTime()}${fn.ext}`;
        cb(null, filename);
      },
    }),
  };
};
