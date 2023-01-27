import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/access-auth.guard';
import { ImagesModule } from './modules/images/images.module';
import { Image } from './modules/images/entities/image.entity';
import { AbumModule } from './modules/abum/abum.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SliderModule } from './modules/slider/slider.module';
import { BannerModule } from './modules/banner/banner.module';
import { Abum } from './modules/abum/entities/abum.entity';
import { Category } from './modules/categories/entities/category.entity';

const dbServer: any = {
	type: 'mysql',
	host: 'db4free.net',
	port: 3306,
	username: 'sammy_1602',
	password: 'hungphuc001',
	database: 'amireux_images',
	entities: [Category],
	autoLoadEntities: true,
	synchronize: false,
	migrationsRun: false,
};
const dbLocal : any = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'sammy',
	password: 'hungphuc001',
	database: 'amireux.image',
	entities: [Category],
	autoLoadEntities: true,
	synchronize: false,
	migrationsRun: false,
};
@Module({
  imports: [
    TypeOrmModule.forRoot( process.env.LOCAL_DB === '1' ? dbLocal: dbServer),
  AuthModule, 
  UsersModule, ImagesModule, AbumModule, CategoriesModule, SliderModule, BannerModule,
  ],
  controllers: [AppController],
  providers: [
	{
		provide: APP_GUARD,
		useClass: JwtAuthGuard,
	  },
	AppService
],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
