import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import FilesHelper from 'files/FilesHelper';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { constants } from 'utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './entities/users.entity';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User Registered', type: User })
  @ApiBadRequestResponse({ description: 'User Registration Failed' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/admin')
  @ApiCreatedResponse({ description: 'Admin User Registered', type: User })
  @ApiBadRequestResponse({ description: 'Admin User Registration Failed' })
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.createAdmin(createUserDto);
  }

  @Post('/changePassword/:userId')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.changePassword(userId, changePasswordDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Users with Profile',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User by Id', type: User })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id/skills')
  @ApiOkResponse({
    description: 'User with Skills by Id',
    type: 'user with skills',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneS(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneWithSkills(id);
  }

  @Get(':id/academics')
  @ApiOkResponse({
    description: 'User with Academics by Id',
    type: 'user with academics',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneA(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneWithAcademics(id);
  }

  @Get(':id/experiences')
  @ApiOkResponse({
    description: 'User with Experience by Id',
    type: 'user with Experience',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneE(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneWithExperiences(id);
  }

  @Get(':id/survey')
  @ApiOkResponse({
    description: 'User with Survey by Id',
    type: 'user with survey',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneSur(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneWithSurvey(id);
  }

  @Get(':id/profile')
  @ApiOkResponse({
    description: 'User with Profile by Id',
    type: 'user with profile',
  })
  @ApiBadRequestResponse({ description: 'User Not Found' })
  findOneP(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneWithProfile(id);
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':userId/withProfile')
  @ApiCreatedResponse({ description: 'User + Profile Update' })
  @ApiBadRequestResponse({ description: 'User + Profile Update Failed' })
  updateWithProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userService.updateWithProfile(userId, updateUserProfileDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User Deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
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
  uploadProfilePic(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(id, file);
  }
}
