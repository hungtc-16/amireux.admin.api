import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/guards/access-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Public()
    @Get("get-all")
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }
}
