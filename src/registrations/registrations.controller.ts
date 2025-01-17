import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Registration } from './entities/registration.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { constants } from 'utils/constants';
import { parse } from 'path';
import FilesHelper from 'files/FilesHelper';
import { VerifyUniEmailDto } from './dto/verify-uni-email.dto';
import { VerifyNewAccountDto } from './dto/verify-new-account.dto';
import { TokenDto } from './dto/token.dto';
import { User } from 'src/users/entities/users.entity';
import { parse as csvParse } from 'csv-parse';
import * as fs from 'fs';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@ApiTags('Registration')
@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Get()
  @ApiOkResponse({
    description: 'All Registration',
    type: [Registration],
  })
  findAll() {
    return this.registrationsService.findAll();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create Registered Records',
    type: Registration,
  })
  @ApiBadRequestResponse({
    description: 'Creating Registration Records Failed',
  })
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.create(createRegistrationDto);
  }

  @Post('uploadRecord')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 4 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const ext = parse(file.originalname).ext.toLowerCase();
        if (!['.csv'].includes(ext)) {
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
          const filename = `examination/records${fn.ext}`;
          const fileSys = new FilesHelper();
          fileSys.removeFolderOrFile(constants.UPLOAD_LOCATION + 'examination');
          fileSys.createGeneralFolder('examination');
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    type rec = { id: number; fname: string; lname: string };

    const headers = ['id', 'fname', 'lname'];
    const records: rec[] = [];
    const csvFilePath = constants.UPLOAD_LOCATION + file.filename;
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    let readError = 'No Error';

    const parser = csvParse(fileContent, {
      delimiter: ',',
      columns: headers,
      trim: true,
      skip_empty_lines: true,
    });

    parser
      .on('readable', function () {
        // Use the readable stream api to consume records
        let record: rec;
        while ((record = parser.read()) !== null) {
          records.push(record);
        }
      })
      .on('error', function (err) {
        // Catch any error
        const x = this.pause();
        console.log(err.message);
        readError = err.message;
        console.log('Saad');
        //throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      })
      .on('end', function () {
        // On Complete
        console.log(records);
      });

    return {
      readError,
      records,
      status: 'Uploaded',
      file: constants.UPLOAD_LOCATION + file.filename,
    };
  }

  @Post('verifyUniversityEmail')
  verifyUniversityEmailWithUniversityId(
    @Body() verifyUniEmailDta: VerifyUniEmailDto,
  ) {
    return this.registrationsService.verifyUniEmail(verifyUniEmailDta);
  }

  @Get('validateUniEmail')
  @ApiOkResponse({
    description: 'Validate the token',
    type: 'ok validated',
  })
  @ApiBadRequestResponse({ description: 'Invalid Token' })
  validateUniEmail(@Query('token') token: string) {
    return this.registrationsService.validateUniEmail(token);
  }

  @Post('getUniversityEmailTokenData')
  @ApiOkResponse({
    description: 'Token is Valid',
    type: Registration,
  })
  @ApiBadRequestResponse({ description: 'Invalid Token or Not Verified' })
  getUniTokenData(@Body() tokenData: TokenDto) {
    return this.registrationsService.getUniEmailTokenData(tokenData);
  }

  @Post('registerAccount')
  sendAccountRequest(@Body() verifyNewAccountDto: VerifyNewAccountDto) {
    return this.registrationsService.verifyNewAccountEmail(verifyNewAccountDto);
  }

  @Get('validateAccountEmail')
  @ApiOkResponse({
    description: 'Validate the account email address token',
    type: 'ok validated',
  })
  @ApiBadRequestResponse({ description: 'Invalid Token' })
  validateEmail(@Query('token') token: string) {
    return this.registrationsService.validateNewAccountEmail(token);
  }

  @Post('getEmailTokenData')
  @ApiOkResponse({
    description: 'Token is Valid',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Invalid Token or Not Verified' })
  getEmailTokenData(@Body() tokenData: TokenDto) {
    return this.registrationsService.getNewAccountTokenData(tokenData);
  }

  @Get('getStepWithId/:roll_number')
  @ApiOkResponse({
    description: 'Registration Step for Id',
    type: typeof { step: '3', reg_id: '1' },
  })
  @ApiBadRequestResponse({ description: 'Roll Number Not Found' })
  getStepWithId(@Param('roll_number') roll_number: string) {
    return this.registrationsService.getStepWithId(roll_number);
  }
}
