import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Skill } from './entities/skill.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { constants } from 'utils/constants';
import { parse } from 'path';
import FilesHelper from 'files/FilesHelper';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SkillsUserInterceptor } from 'utils/skillsUser.interceptor';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post(':userId')
  @ApiCreatedResponse({ description: 'Skill created', type: Skill })
  @ApiBadRequestResponse({ description: 'Skill request failed' })
  create(@Param('userId') id: string, @Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(+id, createSkillDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Skills',
    type: [Skill],
  })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description: 'All Skills for a User',
    type: [Skill],
  })
  findAllforUser(@Param('userId') id: string) {
    return this.skillsService.findAllforUser(+id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Skill by Id', type: Skill })
  @ApiBadRequestResponse({ description: 'Skill Not Found' })
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Skill Update' })
  @ApiBadRequestResponse({ description: 'Skill Update Failed' })
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Skill Deleted',
  })
  @ApiBadRequestResponse({ description: 'Skill Not Found' })
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }

  @Post(':id/uploadCertificate')
  @ApiOkResponse({
    description:
      'Certificate Upload Successfully - Request Body: multipart/form-data, Field Name: file',
  })
  @UseInterceptors(
    SkillsUserInterceptor,
    FileInterceptor('file', {
      limits: { fileSize: 4 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const ext = parse(file.originalname).ext;
        if (
          !['.pdf', '.doc', '.html', '.png', '.jpeg', '.jpg', '.docx'].includes(
            ext,
          )
        ) {
          req.fileValidationError = 'Invalid file type';
          return callback(
            new HttpException(
              'Invalid File Type ' + ext,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        return callback(null, true);
      },
      storage: diskStorage({
        destination: constants.UPLOAD_LOCATION,
        filename: (req: any, file, cb) => {
          req.userId = req.custom.userId;
          const unique = new Date().getTime();
          const fn = parse(file.originalname);
          const filename = `${req.userId}/skillCertificates/${req.params.id}${fn.ext}`;
          const fileSys = new FilesHelper();
          if (req.custom.certificate)
            fileSys.removeFolderOrFile(
              constants.UPLOAD_LOCATION + req.custom.certificate,
            );
          fileSys.createAlumniCertificateFolder({ userId: req.userId });
          cb(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @Param('id', ParseIntPipe) id: string,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.skillsService.updateCertificate(+id, file);
  }

  // @Post(':id/uploadCertificate')
  // @ApiOkResponse({
  //   description:
  //     'Certificate Upload Successfully - Request Body: multipart/form-data, Field Name: file',
  // })
  // @UseInterceptors(
  //   SkillsUserInterceptor,
  //   FileInterceptor('file', {
  //     fileFilter: (req, file, callback) => {
  //       const ext = parse(file.originalname).ext;
  //       if (ext !== '.png') {
  //         req.fileValidationError = 'Invalid file type';
  //         return callback(
  //           new HttpException('Invalid File Type', HttpStatus.BAD_REQUEST),
  //           false,
  //         ); //throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST)
  //       }

  //       return callback(null, true);
  //     },
  //     storage: diskStorage({
  //       destination: constants.UPLOAD_LOCATION,
  //       filename: (req: any, file, cb) => {
  //         req.userId = req.custom.userId;
  //         const unique = new Date().getTime();
  //         const fn = parse(file.originalname);
  //         const filename = `${req.userId}/skillCertificates/${req.params.id}${fn.ext}`;
  //         const fileSys = new FilesHelper();
  //         if (req.custom.certificate)
  //           fileSys.removeFolderOrFile(
  //             constants.UPLOAD_LOCATION + req.custom.certificate,
  //           );
  //         fileSys.createAlumniCertificateFolder({ userId: req.userId });
  //         cb(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(
  //   @Param('id', ParseIntPipe) id: string,
  //   @Request() req,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new FileTypeValidator({
  //           fileType: '.(pdf|docx|doc|html|png|jpeg|jpg)',
  //         }),
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return this.skillsService.updateCertificate(+id, file);
  // }

  // @UseInterceptors(SkillsUserInterceptor)
  // @Get(':id/test')
  // test(@Request() req) {
  //   //req.addition = { userId: 98, name: 'Saad Khanu' };
  //   //console.log(req);
  //   return { c: req.custom, p: req.params, b: req.body };
  // }
}
