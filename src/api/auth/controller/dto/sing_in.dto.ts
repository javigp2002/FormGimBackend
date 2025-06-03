import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingInDto {
	@IsEmail()
	user_name: string;

	@IsNotEmpty()
	password: string;
}
