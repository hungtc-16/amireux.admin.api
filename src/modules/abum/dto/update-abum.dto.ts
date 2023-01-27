import { PartialType } from '@nestjs/swagger';
import { CreateAbumDto } from './create-abum.dto';

export class UpdateAbumDto extends PartialType(CreateAbumDto) {}
