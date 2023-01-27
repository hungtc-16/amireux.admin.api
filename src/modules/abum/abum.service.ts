import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAbumDto } from './dto/create-abum.dto';
import { UpdateAbumDto } from './dto/update-abum.dto';
import { Abum } from './entities/abum.entity';

@Injectable()
export class AbumService {
  constructor(@InjectRepository(Abum) private readonly abumRepository: Repository<Abum>){}

  create(createAbumDto: CreateAbumDto) {
    return 'This action adds a new abum';
  }

  async findAll(): Promise<Abum[] | undefined> {
    // return await this.abumRepository.find({
    //   relations: ["images"]
    // });

    return await this.abumRepository
            .createQueryBuilder('abum')
            .leftJoinAndSelect('abum.images', 'images')
            .loadRelationCountAndMap('abum.images', 'abum.images')
            .getMany();
  }

  async findOne(id: number): Promise<Abum | undefined> {
    return await this.abumRepository.findOne(
      {
        where: {
          id: id
        }, 
        relations: ["images"]
      })}

  update(id: number, updateAbumDto: UpdateAbumDto) {
    return `This action updates a #${id} abum`;
  }

  remove(id: number) {
    return `This action removes a #${id} abum`;
  }
}
