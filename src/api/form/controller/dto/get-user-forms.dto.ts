import { IsNotEmpty } from 'class-validator';

export class GetUserFormsDto {
	@IsNotEmpty()
	userId: number;
}
