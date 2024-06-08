import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import path from 'path';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import FilesHelper from '../../files/FilesHelper';

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
          new BadRequestException('Invalid File Type ' + ext),
          false,
        );
      }
      return callback(null, true);
    },
    storage: diskStorage({
      destination: options.uploadLocation,
      filename: (req: any, file, cb) => {
        const fn = path.parse(file.originalname);
        const filename = `${req.custom.userId}/academicCertificates/${req.params.id}${fn.ext}`;
        const fileSys = new FilesHelper();

        if (req.custom.certificate)
          fileSys.removeFolderOrFile(
            options.uploadLocation + req.custom.certificate,
          );
        fileSys.createAlumniAcademicsFolder({ userId: req.userId });

        cb(null, filename);
      },
    }),
  };
};
