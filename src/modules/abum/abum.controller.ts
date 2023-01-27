import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Public } from '../auth/guards/access-auth.guard';
import { AbumService } from './abum.service';
import { CreateAbumDto } from './dto/create-abum.dto';
import { UpdateAbumDto } from './dto/update-abum.dto';

@Controller('abum')
@UseInterceptors(TransformInterceptor)
export class AbumController {
  constructor(private readonly abumService: AbumService) {}

  @Post()
  create(@Body() createAbumDto: CreateAbumDto) {
    return this.abumService.create(createAbumDto);
  }

  @Get()
  findAll() {
    return this.abumService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbumDto: UpdateAbumDto) {
    return this.abumService.update(+id, updateAbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abumService.remove(+id);
  }
}
