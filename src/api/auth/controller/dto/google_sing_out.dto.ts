import { IsEmail, IsNotEmpty } from 'class-validator';

export class GoogleSingInDto {
	@IsNotEmpty()
	id: string;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	surname: string;

	@IsNotEmpty()
	pictureUrl: string;
	
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	isAdmin: boolean;
}
