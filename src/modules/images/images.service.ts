import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {

  constructor(@InjectRepository(Image) private imagesRepository: Repository<Image>){}

  create(createImageDto: CreateImageDto) {
    this.imagesRepository.create(createImageDto);
    return 'This action adds a new image';
  }

  findAll(): Promise<Image[] | undefined> {
    return this.imagesRepository.find();
  }

  findOne(id: number) : Promise<Image> {
    return this.imagesRepository.findOneBy({id})
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    this.imagesRepository.update(updateImageDto, {id: id})
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    this.imagesRepository.delete(id);
    return `This action removes a #${id} image`;
  }
}
