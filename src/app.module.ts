import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthControllerModule } from './api/auth/controller/auth.controller.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV !== 'production' ? '.dev.env' : '.prod.env',
			isGlobal: true,
		}),
		AuthControllerModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
