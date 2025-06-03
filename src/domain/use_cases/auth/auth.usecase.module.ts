import { Module } from '@nestjs/common';
import { LoginUsecase } from './login.usecase';

@Module({
	imports: [],
	controllers: [],
	providers: [LoginUsecase],
	exports: [LoginUsecase],
})
export class AuthUsecaseModule {
}
