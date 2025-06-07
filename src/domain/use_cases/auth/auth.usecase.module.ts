import { Module } from '@nestjs/common';
import { LoginUsecase } from './login.usecase';
import { GoogleLoginUsecase } from './google-login.usecase';
import { DbModule } from 'src/datasource/db.module';

@Module({
	imports: [DbModule],
	controllers: [],
	providers: [LoginUsecase, GoogleLoginUsecase],
	exports: [LoginUsecase, GoogleLoginUsecase],
})
export class AuthUsecaseModule {
}
