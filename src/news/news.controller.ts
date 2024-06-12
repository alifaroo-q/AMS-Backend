import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFileUpload } from '../../utils/file-upload.multer';
import { constants } from '../../utils/constants';
import { News } from './entities/news.entity';
import { RemoveFileOnFailedValidationFilter } from '../../utils/RemoveFileOnFailedValidation.filter';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseFilters(RemoveFileOnFailedValidationFilter)
  @ApiCreatedResponse({ description: 'News Created', type: News })
  @UseInterceptors(
    FileInterceptor(
      'news_image',
      MulterFileUpload({
        allowedFiles: ['.png', '.jpg', '.jpeg'],
        uploadLocation: constants.NEWS_UPLOAD_LOCATION,
      }),
    ),
  )
  create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    news_image: Express.Multer.File,
  ) {
    return this.newsService.create(createNewsDto, news_image);
  }

  @Get()
  @ApiOkResponse({
    description: 'All News',
    type: [News],
  })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'News with provided Id', type: News })
  @ApiNotFoundResponse({ description: 'News with provided not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(RemoveFileOnFailedValidationFilter)
  @ApiCreatedResponse({ description: 'News with provided Id updated' })
  @ApiNotFoundResponse({
    description: 'News with provided Id not found, update failed',
  })
  @UseInterceptors(
    FileInterceptor(
      'news_image',
      MulterFileUpload({
        allowedFiles: ['.png', '.jpg', '.jpeg'],
        uploadLocation: constants.NEWS_UPLOAD_LOCATION,
      }),
    ),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    news_image: Express.Multer.File,
  ) {
    return this.newsService.update(id, updateNewsDto, news_image);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}
