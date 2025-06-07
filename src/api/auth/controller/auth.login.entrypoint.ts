import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GoogleLoginUsecase } from '../../../domain/use_cases/auth/google-login.usecase';
import { GoogleSingInDto } from './dto/google_sing_in.dto';
import { GoogleSingOutDto } from './dto/google_sing_out.dto';

@Controller()
export class AuthLoginEntrypoint {
	constructor(private googleLoginUseCase: GoogleLoginUsecase) {
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async singIn(@Body() googleToken: GoogleSingInDto): Promise<GoogleSingOutDto> {
		return GoogleSingOutDto.fromUserModel(await this.googleLoginUseCase.run(googleToken.token));
	}
}
