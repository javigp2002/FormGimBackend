import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'fatal'],
	});
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
