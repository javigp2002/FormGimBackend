import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SingInDto } from './dto/sing_in.dto';
import { LoginUsecase } from '../../../domain/use_cases/auth/login.usecase';
import { SingInResponseDto } from './dto/sing_in.response_dto';

@Controller()
export class AuthLoginEntrypoint {
	constructor(private loginUseCase: LoginUsecase) {
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async singIn(@Body() singInDto: SingInDto): Promise<SingInResponseDto> {
		const result = await this.loginUseCase.run(singInDto.user_name, singInDto.password);
		return new SingInResponseDto(result.id, result.name);
	}
}
