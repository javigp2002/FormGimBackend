import { IsEmail, IsNotEmpty } from 'class-validator';

export class GoogleSingInDto {
	@IsNotEmpty()
	token: string;
}
