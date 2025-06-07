import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SingInDto } from './dto/sing_in.dto';
import { LoginUsecase } from '../../../domain/use_cases/auth/login.usecase';
import { GoogleLoginUsecase } from '../../../domain/use_cases/auth/google-login.usecase';
import { SingInResponseDto } from './dto/sing_in.response_dto';
import { GoogleSingInDto } from './dto/google_sing_in.dto';
import { UserModel } from '../../../domain/model/user.model';

@Controller()
export class AuthLoginEntrypoint {
	constructor(private loginUseCase: LoginUsecase, private googleLoginUseCase: GoogleLoginUsecase) {
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async singIn(@Body() googleToken: GoogleSingInDto): Promise<UserModel> {
		return this.googleLoginUseCase.run(googleToken.token);
	}
}
