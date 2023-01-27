import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

	async findByUsername(username: string): Promise<User | undefined> {
		return this.usersRepository.findOneBy({username: username});
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}
	
	async update(id, option){
		await this.usersRepository.update(id, option)
	}

	findOne(id: number): Promise<User> {
		return this.usersRepository.findOneBy({ id });
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}

	async findOneByRefreshToken(id: number, refresh_token: string ): Promise<User | undefined>  {
		return await this.usersRepository.findOneBy({refresh_token: refresh_token});
	}
}
