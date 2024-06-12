import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';
import { constants } from '../../utils/constants';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}
  async create(createNewsDto: CreateNewsDto, news_image: Express.Multer.File) {
    const news = this.newsRepository.create({
      ...createNewsDto,
      news_image: news_image.filename,
    });
    return await this.newsRepository.save(news);
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) throw new NotFoundException(`News with id '${id}' not found`);
    return news;
  }

  async update(
    id: number,
    updateNewsDto: UpdateNewsDto,
    news_image: Express.Multer.File,
  ) {
    const news = await this.newsRepository.findOneBy({ id });

    if (!news) throw new NotFoundException(`News with id '${id}' not found`);

    const news_image_path = path.join(
      constants.NEWS_UPLOAD_LOCATION,
      news.news_image,
    );

    if (news_image) {
      if (fs.existsSync(news_image_path)) {
        fs.unlink(news_image_path, function (err) {
          if (err) console.log(err);
        });
      }

      return this.newsRepository.update(id, {
        ...updateNewsDto,
        news_image: news_image.filename,
      });
    }

    return this.newsRepository.update(id, {
      ...updateNewsDto,
    });
  }

  async remove(id: number) {
    const news = await this.newsRepository.findOneBy({ id });

    if (!news) throw new NotFoundException(`News with id '${id}' not found`);

    const news_image = path.join(
      constants.NEWS_UPLOAD_LOCATION,
      news.news_image,
    );

    if (fs.existsSync(news_image))
      fs.unlink(news_image, function (err) {
        if (err) console.log(err);
      });

    return await this.newsRepository.delete({ id });
  }
}
