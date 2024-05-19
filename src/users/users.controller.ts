import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Request,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import FilesHelper from 'files/FilesHelper';
import { multerOptions } from 'files/muttler.config';
import { diskStorage } from 'multer';
import { extname, parse } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Skill } from 'src/skills/entities/skill.entity';
import { DeleteResult } from 'typeorm';
import { constants } from 'utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
//@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User Registered', type: User })
  @ApiBadRequestResponse({ description: 'User Registration Failed' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Users with Profile',
    type: [User],
  })
  findAll() {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User by Id', type: User })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get(':id/skills')
  @ApiOkResponse({
    description: 'User with Skills by Id',
    type: 'user with skills',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneS(@Param('id') id: string) {
    return this.userService.findOneWithSkills(+id);
  }

  @Get(':id/academics')
  @ApiOkResponse({
    description: 'User with Academics by Id',
    type: 'user with academics',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneA(@Param('id') id: string) {
    return this.userService.findOneWithAcademics(+id);
  }

  @Get(':id/experiences')
  @ApiOkResponse({
    description: 'User with Experience by Id',
    type: 'user with Experience',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneE(@Param('id') id: string) {
    return this.userService.findOneWithExperiences(+id);
  }

  @Get(':id/survey')
  @ApiOkResponse({
    description: 'User with Survey by Id',
    type: 'user with survey',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneSur(@Param('id') id: string) {
    return this.userService.findOneWithSurvey(+id);
  }

  @Get(':id/profile')
  @ApiOkResponse({
    description: 'User with Profile by Id',
    type: 'user with profile',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneP(@Param('id') id: string) {
    return this.userService.findOneWithProfile(+id);
  }

  @Get('email/:email')
  @ApiOkResponse({ description: 'User by Email', type: User })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'User Update' })
  @ApiBadRequestResponse({ description: 'User Update Failed' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch(':userId/withProfile')
  @ApiCreatedResponse({ description: 'User + Profile Update' })
  @ApiBadRequestResponse({ description: 'User + Profile Update Failed' })
  updateWithProfile(
    @Param('userId', ParseIntPipe) id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userService.updateWithProfile(+id, updateUserProfileDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User Deleted',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }

  //@UseGuards(JwtAuthGuard)
  @Post(':id/uploadProfilePic')
  @ApiOkResponse({
    description:
      'Avatar Upload Successfully - Request Body: multipart/form-data, Field Name: file',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 4 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const ext = parse(file.originalname).ext;
        if (!['.png', '.jpeg', '.jpg'].includes(ext)) {
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
          const fn = parse(file.originalname);
          const filename = `${req.params.id}/avatar/profilePic${fn.ext}`;
          const fileSys = new FilesHelper();
          fileSys.removeFolderOrFile(
            constants.UPLOAD_LOCATION + req.params.id + '/avatar',
          );
          fileSys.createAlumniProfileFolder({ id: req.params.id });
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
    return this.userService.updateAvatar(+id, file);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('uploadProfilePic')
  // @UseInterceptors(
  //   FileInterceptor('profileImage', {
  //     storage: diskStorage({
  //       destination: constants.UPLOAD_LOCATION,
  //       filename: (req: any, file, cb) => {
  //         //const subfolder = req.user.sub + '-' + req.user.name;
  //         const unique = new Date().getTime();
  //         const fn = parse(file.originalname);
  //         const filename = `${req.user.sub}/${unique}-${fn.name}${fn.ext}`;
  //         const fileSys = new FilesHelper();
  //         fileSys.createAlumniFolder(req.user);
  //         fileSys.removeOldAvatar(constants.UPLOAD_LOCATION + req.user.avatar);
  //         cb(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(
  //   @Request() req,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   console.log('Pathcc: ' + process.env.UPLOAD_LOCATION);
  //   console.log(file);
  //   return this.userService.updateProfile(req.user.sub, file);
  // }

  // @Get('uni/:e')
  // doLook(@Param('e') e: string) {
  //   return this.userService.doLook(e);
  // }
}
