import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UploadedFile,
  ParseIntPipe,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { parse } from 'path';
import { diskStorage } from 'multer';
import { constants } from 'utils/constants';
import FilesHelper from 'files/FilesHelper';
import { Skill } from './entities/skill.entity';
import { SkillsService } from './skills.service';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkillsUserInterceptor } from 'src/skills/skillsUser.interceptor';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post(':userId')
  @ApiCreatedResponse({ description: 'Skill created', type: Skill })
  @ApiBadRequestResponse({ description: 'Skill request failed' })
  create(
    @Param('userId', ParseIntPipe) id: number,
    @Body() createSkillDto: CreateSkillDto,
  ) {
    return this.skillsService.create(id, createSkillDto);
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
  findForUser(@Param('userId', ParseIntPipe) id: number) {
    return this.skillsService.findForUser(id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Skill by Id', type: Skill })
  @ApiBadRequestResponse({ description: 'Skill Not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Skill Update' })
  @ApiBadRequestResponse({ description: 'Skill Update Failed' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Skill Deleted',
  })
  @ApiBadRequestResponse({ description: 'Skill Not Found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillsService.remove(id);
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
            new BadRequestException('Invalid File Type ' + ext),
            false,
          );
        }
        return callback(null, true);
      },
      storage: diskStorage({
        destination: constants.UPLOAD_LOCATION,
        filename: (req: any, file, cb) => {
          const fn = parse(file.originalname);
          const filename = `${req.custom.userId}/skillCertificates/${req.params.id}${fn.ext}`;

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
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.skillsService.updateCertificate(id, file);
  }
}
